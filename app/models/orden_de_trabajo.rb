class OrdenDeTrabajo < ApplicationRecord
    belongs_to :cliente, :class_name => "Clientes", :primary_key => "Numero_Cliente" ,foreign_key: "clientes"
    has_many :fotos_ordenes
    has_many :escaneo_ordenes
    belongs_to :instalador,optional: true
    #belongs_to :instalador, foreign_key: "instalador"
    belongs_to :representante,:class_name => "Representantes",:primary_key => "Numero_Representante" ,foreign_key: "representantes"
    belongs_to :variante_presupuesto
    belongs_to :tipo_lona,optional: true
    has_many :cobros
    attr_accessor :prue,:vpresupuesto
    def cobrada
      cobrada=self.variante_presupuesto.total_a_cobrar_inline == 0
      if cobrada
        self.update(:cobro_total=> "true")
      else
        self.update(:cobro_total=> "false")
      end
      return cobrada 
    end
    def total_rechazado
      total=0
      self.variante_presupuesto.cabecera_presupuesto.variante_presupuestos.map do |s|
        
        if s.rechazada?
          s.detalle_variante_presupuestos.each do |s|
            total+=s.total_detalle
          end
        end
      end
      return total
    end
    def incompleta
      self.variante_presupuesto.detalle_variante_presupuestos.map { |d| d.state }.include?(0)
    end
    def variante
      variante=self.variante_presupuesto
      if self.variante_presupuesto.rechazada?
        variante=self.variante_presupuesto.cabecera_presupuesto.variante_presupuestos.find_by(state: 1) || self.variante_presupuesto
        
      end
      return variante
    end
    def cobrado
    case self.cobro_total
    when true
      "rgba(255, 0, 0, 1)"
    when false
      "rgba(255, 255, 255, 0)"
    
    end
    end
    def code
    case self.situacion_trabajo
    when 0
      "rgba(0, 0, 255, 0.3)"
    when 1
      "rgba(255, 0, 0, 0.3)"
    when 2
      "rgba(0, 255, 0, 0.3)"
    else
      "white"
    end
    end
    def code2
    case self.situacion_trabajo
    when 0
      "rgba(0, 0, 255, 1)"
    when 1
      "rgba(255, 0, 0, 1)"
    when 2
      "green"
    else
      "white"
    end
    end
    def code_cobro
    case self.situacion_trabajo
    when 2
      if self.variante_presupuesto.a_cobrar_inline.to_d > 0  
      "rgba(255, 0, 0, 0.3)"
      else
        "white"
      end
    else
      "white"
    end
    end
   
    searchable do
      
      integer :numero
      text :numero
      integer :clientes
      integer :representantes
      string :representantes_str, stored: true do
        representantes.to_s
      end
      integer :situacion_trabajo
      
       text :descripcion 
      time :fecha_montaje
      time :fecha_orden
      text :instalar_en
      boolean :cobro_total
      boolean :trabajo_anulado
  
    end
  end
  