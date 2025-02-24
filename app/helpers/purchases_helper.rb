module PurchasesHelper

  def can_dispatched

    is_dispatched =true
    @purchase.dispatch_notes.map{ |d| is_dispatched=false if d.new?}
    is_dispatched=false unless @purchase.opened?
    return is_dispatched
  end
end
