class Representantes < ActiveRecord::Base
  self.table_name = "tb03_Representantes"
  self.primary_key = "Numero_Representante"
  
  has_many :orden_de_trabajos
  def color
    case self.id
      when 3
        return "ddbc95"
        when 2
        return "cdcdc0"
        when 6
        return "5c821a"
        when 8
        return "c05805"
    else
    
        return "ffffff"
      end 
      
  end 
  
end
