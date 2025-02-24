module Sizable
  def sizes
    r = []
    r << width unless width.nil?
    r << height unless height.nil?
    r << depth unless depth.nil?
    if r.count == 0
      return ""
    elsif r[0]==0 and r[1]==0
      return "N/A"
    else
      return r.join(" x ")
    end
  end
end