class OrdenDeTrabajosController < ApplicationController
  before_action :set_orden_de_trabajo, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  before_action :set_artiles, only: [:informe1]
  protect_from_forgery with: :null_session

  # GET /orden_de_trabajos
  # GET /orden_de_trabajos.json
  # 

#  def index
#    if params[:clienteee].present?
#      @orden_de_trabajos = OrdenDeTrabajo.where(cliente: Clientes.find(params[:clienteee]))
#    else
#      if !params[:representantes].nil? and !params[:situacion].nil?
#        @orden_de_trabajos = OrdenDeTrabajo.where(:representantes => params[:representantes], :situacion_trabajo => params[:situacion]).order("'#{params[:campo]}' '#{params[:order]}'")
#      elsif !params[:representantes].nil?
#        @orden_de_trabajos = OrdenDeTrabajo.where(:representantes => params[:representantes]).order("'#{params[:campo]}' '#{params[:order]}'")
#      elsif !params[:situacion].nil?
#        @orden_de_trabajos = OrdenDeTrabajo.where(:situacion_trabajo => params[:situacion]).order("'#{params[:campo]}' '#{params[:order]}'")
#      elsif !params[:numero].nil?
#        @orden_de_trabajos = OrdenDeTrabajo.where(:numero => params[:numero]).order("'#{params[:campo]}' '#{params[:order]}'")
#      else
#        @orden_de_trabajos = OrdenDeTrabajo.all.order("'#{params[:campo]}' '#{params[:order]}'")
#      end
#
#      end
#      @orden_de_trabajos=@orden_de_trabajos.paginate(page: params[:page], per_page: 10)
#  end

  def index
     
    @search = OrdenDeTrabajo.order(numero: :desc).search do
       
      
      
        fulltext "#{params[:search]}"  unless params[:search].blank?
        fulltext "#{params[:invoice]}" do 
          fields(:prue)
        end unless params[:invoice].blank?
      with(:clientes, params[:clienteee]) unless params[:clienteee].nil?
     
 
      with(:representantes, params[:representantes]) unless params[:representantes].nil?
      with(:situacion_trabajo, params[:situacion]) unless params[:situacion].nil?
      with(:cobro_total, params[:cobro_total]=="true") unless params[:cobro_total].nil?
      
       with(:trabajo_anulado, false) if params[:situacion]=="2"
      paginate :page => params[:page] || 1, :per_page =>   10 unless params[:format]=="pdf"
      paginate :page => params[:page] || 1, :per_page =>   10000 if params[:format]=="pdf"
      order_by(params[:campo], params[:order]) unless params[:order].blank?
      order_by :numero,:desc if params[:order].blank?
    end
    @parametros="&nbsp".html_safe
    @parametros+="TEXTO = #{params[:search]} " unless params[:search].blank?
    @parametros+="FACTURADO A = #{params[:invoice]} " unless params[:invoice].blank?
    representantes= Representantes.find(params[:representantes]).Nombre_Representante  unless params[:representantes].blank?
    @parametros+="ASIGNADO A = #{representantes} " unless params[:representantes].blank?
    @parametros+="Sin empezar " if !params[:situacion].blank? and  params[:situacion].to_i==0
    @parametros+="Para Montar " if !params[:situacion].blank? and  params[:situacion].to_i==1
    @parametros+="Terminado " if !params[:situacion].blank? and  params[:situacion].to_i==2
    @parametros+="Sin Cobrar " if !params[:cobro_total].blank? and  params[:cobro_total]=="false"
    @parametros+="Cobrados " if !params[:cobro_total].blank? and  params[:cobro_total]=="true"
    
    @conditions="utf8=✓"
    @conditions+="&search=#{params[:search]}"  unless params[:search].blank?
    @conditions+="&representantes=#{params[:representantes]}"  unless params[:representantes].blank?
    @conditions+="&situacion=#{params[:situacion]}"  unless params[:situacion].blank?
    @conditions+="&cobro_total=#{params[:cobro_total]}"  unless params[:cobro_total].blank?
    
    @orden_de_trabajos = @search.results
    @cuenta="Total OT= #{@orden_de_trabajos.total_entries}"
    respond_to do |format|
      format.js 
      format.html
      format.json
      format.pdf { pdf = OrdenDeTrabajoInformePepe.new(@orden_de_trabajos,@parametros,@cuenta)
                   send_data pdf.render, filename: "InformeOT.pdf", type: "application/pdf", disposition: "inline"}
    end
  end
  def informe1
     
    @search = OrdenDeTrabajo.all.order(numero: :desc).search do
       
      
      
        fulltext "#{params[:search]}"  unless params[:search].blank?
        
      
      
 
      with(:representantes, params[:representantes]) unless params[:representantes].nil?
      with(:cobro_total, params[:cobro_total]=="true") unless params[:cobro_total].nil?
      with(:fecha_orden).between(((params[:fecha_inicio].to_date rescue nil) || Date.today)..((params[:fecha_final].to_date rescue nil) || Date.today ))
      group :representantes_str do
        limit OrdenDeTrabajo.all.count
      end
      paginate :page => params[:page] || 1, :per_page =>   1000000
   
         order_by(params[:campo], params[:order]) unless params[:order].blank?
      order_by :numero,:desc if params[:order].blank?
    end
    @search2 = OrdenDeTrabajo.all.order(numero: :desc).search do
       
      
      
        fulltext "#{params[:search]}"  unless params[:search].blank?
        
      
      
 
      with(:representantes, params[:representantes]) unless params[:representantes].nil?
      with(:cobro_total, params[:cobro_total]=="true") unless params[:cobro_total].nil?
      with(:fecha_orden).between(((params[:fecha_inicio].to_date rescue nil) || Date.new(2000,1,1))..((params[:fecha_final].to_date rescue nil) || Date.today + 3.month))
      paginate :page => params[:page] || 1, :per_page =>   1000000
         order_by(params[:campo], params[:order]) unless params[:order].blank?
      order_by :numero,:desc if params[:order].blank?
    end
    @parametros="&nbsp".html_safe
    @parametros+="TEXTO = #{params[:search]} " unless params[:search].blank?
    @parametros+="FACTURADO A = #{params[:invoice]} " unless params[:invoice].blank?
    representantes= Representantes.find(params[:representantes]).Nombre_Representante  unless params[:representantes].blank?
    @parametros+="ASIGNADO A = #{representantes} " unless params[:representantes].blank?
    @parametros+="Sin empezar " if !params[:situacion].blank? and  params[:situacion].to_i==0
    @parametros+="Para Montar " if !params[:situacion].blank? and  params[:situacion].to_i==1
    @parametros+="Terminado " if !params[:situacion].blank? and  params[:situacion].to_i==2
    @parametros+="Sin Cobrar " if !params[:cobro_total].blank? and  params[:cobro_total]=="false"
    @parametros+="Cobrados " if !params[:cobro_total].blank? and  params[:cobro_total]=="true"
    
    @conditions="utf8=✓"
    @conditions+="&search=#{params[:search]}"  unless params[:search].blank?
    @conditions+="&representantes=#{params[:representantes]}"  unless params[:representantes].blank?
    @conditions+="&situacion=#{params[:situacion]}"  unless params[:situacion].blank?
    @conditions+="&cobro_total=#{params[:cobro_total]}"  unless params[:cobro_total].blank?
    
    @orden_de_trabajos_informe = @search2.results
    @cuenta="Total OT= #{@orden_de_trabajos_informe.total_entries}"
    respond_to do |format|
      format.js 
      format.html
      format.json
      format.pdf { pdf = OrdenDeTrabajoInformePepe.new(@orden_de_trabajos,@parametros,@cuenta)
                   send_data pdf.render, filename: "InformeOT.pdf", type: "application/pdf", disposition: "inline"}
    end
    
  end
  def index_clientes
    @search = Clientes.order(Numero_Cliente: :desc).search do
      fulltext params[:search] unless params[:search].blank?
      paginate :page => params[:page] || 1, :per_page =>   30
      order_by params[:order], params[:sort] unless params[:order].blank?
    end
    @clientes = @search.results
    @orden_de_trabajo= OrdenDeTrabajo.find(params[:orden])
    respond_to do |format|
      format.js { render partial: 'search_results'}
      format.html
    end
  end
  def cliente
    
    @orden_de_trabajo=OrdenDeTrabajo.find(params[:orden])
    cliente=Clientes.find(params[:cliente])
    @orden_de_trabajo.update(clientes: params[:cliente])
    
  end
  def generate_orden_de_trabajo_document
    @orden_de_trabajo = OrdenDeTrabajo.find(params[:orden_de_trabajo_id])
    @logo=params[:logo]
    pdf =OrdenDeTrabajoDocument.new(@orden_de_trabajo,current_user,@logo)
    send_data pdf.render, filename: "#{@orden_de_trabajo.numero}.pdf", type: "application/pdf", disposition: "inline"
  end
  def generate_informe_orden_de_trabajo_document
    @orden_de_trabajo = OrdenDeTrabajo.find(params[:orden_de_trabajo_id])
    @logo=params[:logo]
    pdf =OrdenDeTrabajoDocument.new(@orden_de_trabajo,current_user,@logo)
    send_data pdf.render, filename: "#{@orden_de_trabajo.numero}.pdf", type: "application/pdf", disposition: "inline"
  end
  def generate_albaran_document
    @orden_de_trabajo = OrdenDeTrabajo.find(params[:orden_de_trabajo_id])
    pdf =AlbaranDocument.new(@orden_de_trabajo,current_user)
    send_data pdf.render, filename: "#{@orden_de_trabajo.numero}.pdf", type: "application/pdf", disposition: "inline"
  end
  # GET /orden_de_trabajos/1
  # GET /orden_de_trabajos/1.json
  def show
  end
  def presupuesto
    
    @orden_de_trabajo=OrdenDeTrabajo.find(params[:orden_de_trabajo_id])
    @orden_de_trabajo.update(variante_presupuesto_id: params[:variante_presupuesto])
    redirect_to edit_orden_de_trabajo_path(@orden_de_trabajo)
    
  end
  def list
     @orden_de_trabajo = OrdenDeTrabajo.find(params[:orden_de_trabajo_id])
  end
  # GET /orden_de_trabajos/new
  def new

    if !params[:variante].present?
      numero_cabecera = CabeceraPresupuesto.last.present? ? CabeceraPresupuesto.last.numero_presupuesto+1 : 1
      cabecera=CabeceraPresupuesto.new(numero_presupuesto: numero_cabecera, clientes: Clientes.find(params[:clienteee]),fecha: Date.today, representante:Representantes.first )
      cabecera.save!
      @numero_variante=cabecera.variante_presupuestos.first
      @numero_variante.aprobar!
      @orden_de_trabajo = OrdenDeTrabajo.new(numero:(OrdenDeTrabajo.last.numero+1 rescue 1),cliente:Clientes.find(params[:clienteee]),fecha_orden: Date.today,variante_presupuesto: @numero_variante,representante: current_user.representantes,instalar_en: params[:text_instalar] || "")
    else
      @orden_de_trabajo = OrdenDeTrabajo.new(numero:(OrdenDeTrabajo.last.numero+1 rescue 1),cliente:VariantePresupuesto.find(params[:variante]).cabecera_presupuesto.clientes,fecha_orden: Date.today,variante_presupuesto: VariantePresupuesto.find(params[:variante]),representante: current_user.representantes,instalar_en: params[:text_instalar] || "")
    end


    if @orden_de_trabajo.save
      respond_to do |format|
      format.html { redirect_to edit_orden_de_trabajo_path(@orden_de_trabajo), notice: 'Orden de trabajo was successfully updated.' }
        end
    end
  end

  # GET /orden_de_trabajos/1/edit
  def edit
  end

  # POST /orden_de_trabajos
  # POST /orden_de_trabajos.json
  def create
    @orden_de_trabajo = OrdenDeTrabajo.new(orden_de_trabajo_params)

    respond_to do |format|
      if @orden_de_trabajo.save

        format.html { redirect_to @orden_de_trabajo, notice: 'Orden de trabajo was successfully created.' }
        format.json { render :show, status: :created, location: @orden_de_trabajo }
      else
        format.html { render :new }
        format.json { render json: @orden_de_trabajo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /orden_de_trabajos/1
  # PATCH/PUT /orden_de_trabajos/1.json
  def update
    @code=@orden_de_trabajo.code
    respond_to do |format|
     #@orden_de_trabajo.update(:representantes => Representantes.find(params[:orden_de_trabajo][:representante])) if params[:orden_de_trabajo][:representante]
      @id=@orden_de_trabajo.id
      if @orden_de_trabajo.update(orden_de_trabajo_params)
        if params[:commit]=="Subir Fotos"
        if params[:orden_de_trabajo][:images]
          params[:orden_de_trabajo][:images].each { |f|
            @orden_de_trabajo.fotos_ordenes.create(foto: f)
          }
        end
        end
        if params[:commit]=="Subir Escaneo"
          if params[:orden_de_trabajo][:images]
            params[:orden_de_trabajo][:images].each { |f|
              @orden_de_trabajo.escaneo_ordenes.create(escaneo: f)
            }
          end
        end
        @code=@orden_de_trabajo.code
        @code_cobro=@orden_de_trabajo.code_cobro
       
        DetalleVariantePresupuesto.new(detalle_variante_presupuesto_params).save if params[:detalle_variante_presupuesto]
        format.js 
        format.html { redirect_to edit_orden_de_trabajo_path(@orden_de_trabajo) }
        format.json { render :show, status: :ok, location: @orden_de_trabajo }

      else
        format.js { render             
        # raw javascript to be executed on client-side
        "alert('Hello Rails');" }
        format.html { render :edit }
        format.json { render json: @orden_de_trabajo.errors, status: :unprocessable_entity }

      end
    end
  end

  # DELETE /orden_de_trabajos/1
  # DELETE /orden_de_trabajos/1.json
  def destroy
    @orden_de_trabajo.destroy
    respond_to do |format|
      format.html { redirect_to orden_de_trabajos_url, notice: 'Orden de trabajo was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_orden_de_trabajo
      @orden_de_trabajo = OrdenDeTrabajo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def orden_de_trabajo_params
      params.require(:orden_de_trabajo).permit(:numero, :fecha_orden, :clientes, :precio_neto, :precio_total, :localizador, :instalar_en, :telf_instalacion, :zona, :representantes, :medidor, :fecha_montaje, :plazo_entrega, :instalador, :fecha_instalacion, :variante_presupuesto_id, :descripcion, :linea, :salida, :altura, :manivela, :tipo_lona_id, :color_lona, :cenefa, :altura_cenefa, :color_cenefa, :ribete, :cinta_grapa, :rotulo, :tipo_letra, :color_rotulo, :situacion_trabajo, :situacion_cobros, :trabajo_terminado, :cobro_total, :trabajo_anulado, :causa_anulacion, :observacion_general, :observacion_oficina, :notas_cobro, :incidencias_montaje, :codigo_fabricacion, :notas_1, :fecha_fabricacion, :notas_2,:prue,:vpresupuesto,:images,:instalador_id)
    end
    def detalle_variante_presupuesto_params
    params.require(:detalle_variante_presupuesto).permit(:variante_presupuesto_id, :articulos, :descripcion_abreviada, :descripcion_detallada, :cantidad, :precio, :descuento, :igic, :articulo)
  end
  def set_artiles
    @entra=current_user.directive==1 ? true : false
  end
end
