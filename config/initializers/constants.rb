CONTAINERS_SORTER_LIST={}
USERS_SORTER_LIST={}
CREDIT_NOTES_SORTER_LIST={}
RETURN_NOTES_SORTER_LIST={}
MACHINERY_TYPES_SORTER_LIST={}
MACHINERIES_SORTER_LIST ={}
DESTINATION_MACHINERIES_SORTER_LIST ={}
WORK_LOADS_DETAILS_SORTER_LIST={}
WORK_LOADS_SORTER_LIST={}
DESTINATION_T_TY_TYPES_SORTER_LIST={}
DESTINATION_TRANSPORT_TYPES_SORTER_LIST ={}
DESTINATION_TRANSPORTS_SORTER_LIST ={}
TRANSPORTS_SORTER_LIST = {}
PURCHASE_TAXES_SORTER_LIST = {}
UNIT_TYPES = {1 => "SquareMeters",
              2 => "LinnealMeters",
              3 => "Units"}

STORES_SORTER_LIST = {I18n.t("aia_store.stores.cols.name") => "name",
                      I18n.t("aia_store.stores.cols.description") => "description"}
INVENTORIES_SORTER_LIST = {I18n.t("aia_store.inventories.cols.inventory_date") => "inventory_date"}
INVENTORY_DETAILS_SORTER_LIST = {}

UNITS_SORTER_LIST = {I18n.t("aia_store.units.cols.name") => "name",
                     I18n.t("aia_store.units.cols.description") => "description"}

FAMILIES_SORTER_LIST = {I18n.t("aia_store.families.cols.name") => "name",
                        I18n.t("aia_store.families.cols.description") => "description"}

PRIORITIES_SORTER_LIST = {I18n.t("aia_store.priorities.cols.name") => "name",
                          I18n.t("aia_store.priorities.cols.description") => "description"}

PROVIDERS_SORTER_LIST = {I18n.t("aia_store.providers.cols.name") => "name",
                         I18n.t("aia_store.providers.cols.description") => "description"}

PURCHASES_SORTER_LIST = {I18n.t("aia_store.purchases.cols.date") => "date",
                         I18n.t("aia_store.purchases.cols.state") => "state"}

ITEMS_SORTER_LIST = {"Descripción" => "real_description",
                     "Código"  => "id"}

#PURCHASES_SORTER_LIST = {"Cantidad" => "cantidad",
#                         "Artículo" => "articulo",
#                         "Alto" => "alto",
#                         "Largo" => "largo",
#                         "Fondo" => "fondo",
#                         "Presupuesto" => "presupuesto"}


DISPATCH_NOTES_SORTER_LIST = {I18n.t("aia_store.dispatch_notes.cols.dispatch_note_code") => "dispatch_note_code",
                              I18n.t("aia_store.dispatch_notes.cols.observations") => "observations",
                              I18n.t("aia_store.dispatch_notes.cols.entry_date") => "entry_date"}

MEASURES_SORTER_LIST = {"Código" => "code",
                        "Descripción" => "description",
                        "Palabra" => "word"}

SIZES_SORTER_LIST = {"Código" => "code",
                     "Descripción" => "description",
                     "Palabra" => "word"}

STOCKS_SORTER_LIST = {I18n.t("aia_store.stocks.cols.stock_code") => "stock_code"}

CLIENTS_SORTER_LIST = {I18n.t("aia_store.clients.cols.name") => "name"}

BUDGET_TYPES_SORTER_LIST = {I18n.t("aia_store.budget_types.cols.name") => "name"}

TAXES_SORTER_LIST = {I18n.t("aia_store.taxes.cols.name") => "name"}

PAYMENTS_SORTER_LIST = {I18n.t("aia_store.payments.cols.name") => "name"}

AGREEMENTS_SORTER_LIST = {I18n.t("aia_store.agreements.cols.name") => "name"}

BUDGETS_SORTER_LIST = {I18n.t("aia_store.budgets.cols.budget_code") => "budget_code",
                       I18n.t("aia_store.budgets.cols.budget_date") => "budget_date",
                       I18n.t("aia_store.budgets.cols.observations") => "observations"}

INVOICES_SORTER_LIST = {I18n.t("aia_store.invoices.cols.code") => "code"}

WORKS_SORTER_LIST = {I18n.t("aia_store.works.cols.description") => "description",
                     I18n.t("aia_store.works.cols.price") => "price"}

DELIVERY_NOTES_SORTER_LIST = {}
WORK_SHEETS_SORTER_LIST = {}
BUDGET_SECTIONS_SORTER_LIST = {}
PRICE_CALCULATION_CONCEPTS_SORTER_LIST = {}
ITEM_TYPES_SORTER_LIST = {"Nombre" => "name_for_sort",
                          "Código" => "code_for_sort",
                          "Palabra Clave"=> "word_for_sort"}
COLOUR_TYPES_SORTER_LIST = {I18n.t("aia_store.colour_types.cols.description") => "description",
                            I18n.t("aia_store.colour_types.cols.code") => "code",
                            I18n.t("aia_store.colour_types.cols.item_type_id") => "item_type_id",
                            I18n.t("aia_store.colour_types.cols.word") => "word"}
MATERIAL_TYPES_SORTER_LIST = {I18n.t("aia_store.material_types.cols.description") => "description",
                              I18n.t("aia_store.material_types.cols.code") => "code",
                              I18n.t("aia_store.material_types.cols.item_type_id") => "item_type_id",
                              I18n.t("aia_store.material_type_types.cols.word") => "word"}
THICKNESS_TYPES_SORTER_LIST = {I18n.t("aia_store.thickness_types.cols.description") => "description",
                               I18n.t("aia_store.thickness_types.cols.code") => "code",
                               I18n.t("aia_store.thickness_types.cols.item_type_id") => "item_type_id",
                               I18n.t("aia_store.thickness_types.cols.word") => "word"}
ITEM_TYPE_TYPES_SORTER_LIST = {I18n.t("aia_store.item_type_types.cols.description") => "description",
                               I18n.t("aia_store.item_type_types.cols.code") => "code",
                               I18n.t("aia_store.item_type_types.cols.item_type_id") => "item_type_id",
                               I18n.t("aia_store.item_type_types.cols.word") => "word"}
PROVIDER_TYPES_SORTER_LIST = {I18n.t("aia_store.provider_types.cols.description") => "description",
                              I18n.t("aia_store.provider_types.cols.code") => "code",
                              I18n.t("aia_store.provider_types.cols.item_type_id") => "item_type_id"}

TAX_BUDGET_VARIANT_DETAILS_SORTER_LIST = {"igic" => "igic"}