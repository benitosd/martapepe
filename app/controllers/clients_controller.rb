class ClientsController < ApplicationController
  before_action :set_client, only: [:show, :edit, :update, :destroy]


  def check
    if !flash[:back_search].nil?
      if params[:search].nil?
        params[:search] = flash[:back_search][0]
        params[:order] = flash[:back_search][1]
        params[:sort] = flash[:back_search][2]
        flash.keep(:back_search)


      elsif  (flash[:back_search][0] != params[:search] ||
          flash[:back_search][1] != params[:order] || flash[:back_search][2] != params[:sort])

        flash[:back_search] = [params[:search], params[:order], params[:sort]]
        flash.keep(:back_search)
      end
    else
      flash[:back_search] = [params[:search], params[:order], params[:sort]]
      flash.keep(:back_search)
    end
  end


  # GET /clients
  def index
    #check

    @search = Client.search do
      fulltext params[:search] unless params[:search].blank?
      paginate :page => params[:page] || 1, :per_page => 10
      order_by params[:order], params[:sort] unless params[:order].blank?
    end
    @clients = @search.results


    @search_excel = Client.search do
      fulltext params[:search] unless params[:search].blank?
      paginate :page => params[:page] || 1, :per_page => Client.all.count
    end

    @clients_excel=@search_excel.results
    filename = "Clientes.xls"
    respond_to do |format|
      format.html
      format.xls { headers["Content-Disposition"] = "attachment; filename=\"#{filename}\"" }
    end

  end

  # GET /clients/1
  def show
    flash.keep[:back_search]

  end

  # GET /clients/new
  def new
    flash.keep[:back_search]

    @client = Client.new
  end

  # GET /clients/1/edit
  def edit
    flash.keep[:back_search]

  end

  # POST /clients
  def create
    flash.keep[:back_search]

    @client = Client.new(client_params)

    if @client.save
      respond_to do |format|
        format.turbo_stream { redirect_to clients_path }
        format.html { redirect_to clients_path }
      end
    else
      respond_to do |format|
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            "form_errors",
            partial: "layouts/form_errors",
            locals: { object: @client }
          )
        end
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  rescue ActiveRecord::ValueTooLong => e
    @client.errors.add(:base, "Error: #{e.message}")
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.replace(
          "form_errors",
          partial: "layouts/form_errors",
          locals: { object: @client }
        )
      end
      format.html { render :new, status: :unprocessable_entity }
    end
  end

  # PATCH/PUT /clients/1
  def update
    flash.keep[:back_search]

    if @client.update(client_params)
      respond_to do |format|
        format.turbo_stream { redirect_to clients_path }
        format.html { redirect_to clients_path }
      end
    else
      respond_to do |format|
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace(
            "form_errors",
            partial: "layouts/form_errors",
            locals: { object: @client }
          )
        end
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  rescue ActiveRecord::ValueTooLong => e
    @client.errors.add(:base, "Error: #{e.message}")
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.replace(
          "form_errors",
          partial: "layouts/form_errors",
          locals: { object: @client }
        )
      end
      format.html { render :edit, status: :unprocessable_entity }
    end
  end

  # DELETE /clients/1
  def destroy
    flash.keep[:back_search]

    @client.destroy
    redirect_to clients_url, notice: I18n.t("aia_store.messages.destroyed", resource: "Client")
  end
  def find_province_and_municipalities
    if params[:postal_code].present?
      province_id = Municipality.where(postal_code: params[:postal_code]).first&.province_id
      municipalities = Municipality.where(postal_code: params[:postal_code]).order(:name)
      provinces = Province.where(id: province_id).order(:name)
    elsif params[:province_id].present?
      municipalities = Municipality.where(province_id: params[:province_id]).order(:name)
      provinces = Province.where(id: params[:province_id]).order(:name)
    else
      municipalities = Municipality.none
      provinces = Province.none
    end
  
    render json: {
      provinces: provinces.map { |p| { id: p.id, name: p.name } },
      municipalities: municipalities.map { |m| { id: m.id, name: m.name } },
      selectedProvince: province_id,
      selectedMunicipality: params[:municipality_id]
    }
  end
  

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_client
    @client = Client.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def client_params
    params.require(:client).permit(:name, :address, :zip_code, :city, :cif, :client_number, :phone1, :phone2, :owner_name, :owner_email, :owner_phone, :admin_name, :admin_email, :admin_phone, :province, :web, :cnae, :method_of_payment_id, :ccc, :fax, :ledger_account,:province_id,:municipality_id)
  end
end
