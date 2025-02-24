class Clientes < ActiveRecord::Base
  self.table_name = "tb02_Clientes"
  self.primary_key = "Numero_Cliente"
  #alias_attribute :fecha_alta, self.name
  has_many :clientes_cabecera_presupuesto, :class_name => "CabeceraPresupuesto" ,foreign_key: "Numero_Cliente"
  has_many :clientes_instalacion_cabecera_presupuesto, :class_name => "CabeceraPresupuesto" ,foreign_key: "Numero_Cliente"
  has_many :representantes_orden_de_trabajo, :class_name => "OrdenDeTrabajo" ,foreign_key: "Numero_Representante"
searchable do
  text :Nombre_Cliente
  text :Numero_Cliente
  text(:Telefono_1) {|d| d.Telefono_1.gsub(/\r/," ").gsub(/\n/," ").gsub(/\s+/, '').squeeze(' ')}
  text(:Telefono_2) {|d| d.Telefono_2.gsub(/\r/," ").gsub(/\n/," ").gsub(/\s+/, '').squeeze(' ')}
  text(:Telefono_3) {|d| d.Telefono_3.gsub(/\r/," ").gsub(/\n/," ").gsub(/\s+/, '').squeeze(' ')}
  text :Alias_Cliente
  text :Direccion
end
def cod_postal
  if !self.Cod_Postal.blank?
    return "#{self.Cod_Postal} -"
  else
    return ""
  end
end
end
