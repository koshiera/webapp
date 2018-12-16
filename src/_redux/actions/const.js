import * as ACTION_ from './actions_const'

export * from './actions_const'

// Redux actions

// App
export const UPDATE_APP_STATUS = 'UPDATE_APP_STATUS'
export const UPDATE_APP_CONFIG = 'UPDATE_APP_CONFIG'

// User
export const IS_MANAGER = 'IS_MANAGER'

// Transactions
export const ADD_TRANSACTION = 'ADD_TRANSACTION'
export const UPDATE_TRANSACTIONS = 'UPDATE_TRANSACTIONS'

// Eventful

export const GET_VAULTS_SEARCH_LIST = 'GET_VAULTS_SEARCH_LIST'
export const DRAGO_HOLDER_TRANSACTIONS_UPDATE =
  'DRAGO_HOLDER_TRANSACTIONS_UPDATE'
export const DRAGO_MANAGER_TRANSACTIONS_UPDATE =
  'DRAGO_MANAGER_TRANSACTIONS_UPDATE'
export const UPDATE_TRANSACTIONS_VAULT_HOLDER =
  'UPDATE_TRANSACTIONS_VAULT_HOLDER'
export const UPDATE_TRANSACTIONS_VAULT_MANAGER =
  'UPDATE_TRANSACTIONS_VAULT_MANAGER'
export const DRAGO_SELECTED_DETAILS_UPDATE = 'DRAGO_SELECTED_DETAILS_UPDATE'
export const DRAGO_SELECTED_DETAILS_RESET = 'DRAGO_SELECTED_DETAILS_RESET'
export const SELECTED_DRAGO_DETAILS_UPDATE_CHART_ASSETS_MARKET_DATA_INIT =
  'SELECTED_DRAGO_DETAILS_UPDATE_CHART_ASSETS_MARKET_DATA_INIT'
export const SELECTED_DRAGO_DETAILS_UPDATE_CHART_ASSETS_MARKET_ADD_DATAPOINT =
  'SELECTED_DRAGO_DETAILS_UPDATE_CHART_ASSETS_MARKET_ADD_DATAPOINT'
export const UPDATE_SELECTED_VAULT_DETAILS = 'UPDATE_SELECTED_VAULT_DETAILS'
export const UPDATE_SELECTED_VAULT_DETAILS_RESET =
  'UPDATE_SELECTED_VAULT_DETAILS_RESET'

// Notification
export const INIT_NOTIFICATION = 'INIT_NOTIFICATION'
export const QUEUE_ERROR_NOTIFICATION = 'QUEUE_ERROR_NOTIFICATION'
export const QUEUE_WARNING_NOTIFICATION = 'QUEUE_WARNING_NOTIFICATION'
export const QUEUE_ACCOUNT_NOTIFICATION = 'QUEUE_ACCOUNT_NOTIFICATION'

// DRAGO
export const GET_TOKEN_BALANCES_DRAGO = 'GET_TOKEN_BALANCES_DRAGO'

// ENDPOINT
export const CHECK_METAMASK_IS_UNLOCKED = 'CHECK_METAMASK_IS_UNLOCKED'
export const GET_ACCOUNTS_TRANSACTIONS = 'GET_ACCOUNTS_TRANSACTIONS'
export const MONITOR_ACCOUNTS_START = 'MONITOR_ACCOUNTS_START'
export const MONITOR_ACCOUNTS_STOP = 'MONITOR_ACCOUNTS_STOP'
export const CHECK_APP_IS_CONNECTED = 'CHECK_APP_IS_CONNECTED'
export const ATTACH_INTERFACE = 'ATTACH_INTERFACE'
export const UPDATE_INTERFACE = 'UPDATE_INTERFACE'

// EXCHANGE

// Trading pair

// UI

// export const EXCHANGE_PANEL_UI_PROPERTIES_UPDATE =
//   'EXCHANGE_PANEL_UI_PROPERTIES_UPDATE'

// Funds
export const UPDATE_AVAILABLE_FUNDS = 'UPDATE_AVAILABLE_FUNDS'

// Relays
export const UPDATE_AVAILABLE_RELAYS = 'UPDATE_AVAILABLE_RELAYS'
export const UPDATE_SELECTED_RELAY = 'UPDATE_SELECTED_RELAY'
export const UPDATE_SELECTED_EXCHANGE = 'UPDATE_SELECTED_EXCHANGE'

// User oders
export const FETCH_ACCOUNT_ORDERS_START = 'FETCH_ACCOUNT_ORDERS_START'
export const UPDATE_FUND_ORDERS = 'UPDATE_FUND_ORDERS'
export const FETCH_ACCOUNT_ORDERS_STOP = 'FETCH_ACCOUNT_ORDERS_STOP'

// Market
export const CHART_MARKET_DATA_UPDATE = 'CHART_MARKET_DATA_UPDATE'
export const FETCH_CANDLES_DATA_SINGLE_START = 'FETCH_CANDLES_DATA_SINGLE_START'
export const FETCH_CANDLES_DATA_SINGLE_STOP = 'FETCH_CANDLES_DATA_SINGLE_STOP'
export const FETCH_CANDLES_DATA_PORTFOLIO_START =
  'FETCH_CANDLES_DATA_PORTFOLIO_START'
export const FETCH_CANDLES_DATA_PORTFOLIO_STOP =
  'FETCH_CANDLES_DATA_PORTFOLIO_STOP'
export const FETCH_HISTORY_TRANSACTION_LOGS = 'FETCH_HISTORY_TRANSACTION_LOGS'
export const UPDATE_HISTORY_TRANSACTION_LOGS = 'UPDATE_HISTORY_TRANSACTION_LOGS'
export const FETCH_ASSETS_PRICE_DATA = 'FETCH_ASSETS_PRICE_DATA'

export const CHART_MARKET_DATA_ADD_DATAPOINT = 'CHART_MARKET_DATA_ADD_DATAPOINT'
export const CHART_MARKET_DATA_INIT = 'CHART_MARKET_DATA_INIT'

// Trades
export const TRADES_HISTORY_UPDATE = 'TRADES_HISTORY_UPDATE'
export const TRADES_HISTORY_RESET = 'TRADES_HISTORY_RESET'
export const MONITOR_EXCHANGE_EVENTS_START = 'MONITOR_EXCHANGE_EVENTS_START'
export const MONITOR_EXCHANGE_EVENTS_STOP = 'MONITOR_EXCHANGE_EVENTS_STOP'

// UI Elements
export const UPDATE_ELEMENT_LOADING = 'UPDATE_ELEMENT_LOADING'

// Account
export const SET_MAKER_ADDRESS = 'SET_MAKER_ADDRESS'
export const UPDATE_ACCOUNT_SIGNATURE = 'UPDATE_ACCOUNT_SIGNATURE'

// Order selection
export const UPDATE_SELECTED_FUND = 'UPDATE_SELECTED_FUND'
export const ORDER_UPDATE_FROM_RELAY = 'ORDER_UPDATE_FROM_RELAY'
export const UPDATE_TRADE_TOKENS_PAIR = 'UPDATE_TRADE_TOKENS_PAIR'

// Orderbook
export const ORDERBOOK_UPDATE = 'ORDERBOOK_UPDATE'
export const ORDERBOOK_INIT = 'ORDERBOOK_INIT'
export const SET_ORDERBOOK_AGGREGATE_ORDERS = 'SET_ORDERBOOK_AGGREGATE_ORDERS'

// Websocket
export const RELAY_OPEN_WEBSOCKET_TICKER = 'RELAY_OPEN_WEBSOCKET_TICKER'
export const RELAY_OPEN_WEBSOCKET_BOOK = 'RELAY_OPEN_WEBSOCKET_BOOK'
export const RELAY_MSG_FROM_WEBSOCKET = 'RELAY_MSG_FROM_WEBSOCKET'
export const RELAY_CLOSE_WEBSOCKET = 'RELAY_CLOSE_WEBSOCKET'
export const RELAY_GET_ORDERS = 'RELAY_GET_ORDERS'
export const RELAY_UPDATE_ORDERS = 'RELAY_UPDATE_ORDERS'

// Tokens
export const SET_TOKEN_ALLOWANCE = 'SET_TOKEN_ALLOWANCE'
export const GET_PRICES_BITFINEXE = 'GET_PRICES_BITFINEX'
export const TOKEN_PRICE_TICKERS_FETCH_START = 'TOKEN_PRICE_TICKERS_FETCH_START'
export const TOKENS_TICKERS_UPDATE = 'TOKENS_TICKERS_UPDATE'
export const TOKEN_PRICE_TICKERS_FETCH_STOP = 'TOKEN_PRICE_TICKERS_FETCH_STOP'
export const UPDATE_FUND_LIQUIDITY = 'UPDATE_FUND_LIQUIDITY'
export const UPDATE_AVAILABLE_TRADE_TOKENS_PAIRS =
  'UPDATE_AVAILABLE_TRADE_TOKENS_PAIRS'
export const UPDATE_LIQUIDITY_AND_TOKENS_BALANCE =
  'UPDATE_LIQUIDITY_AND_TOKENS_BALANCE'
export const UPDATE_LIQUIDITY_AND_TOKENS_BALANCE_RESET =
  'UPDATE_LIQUIDITY_AND_TOKENS_BALANCE_RESET'
export const UPDATE_LIQUIDITY_AND_TOKENS_BALANCE_START =
  'UPDATE_LIQUIDITY_AND_TOKENS_BALANCE_START'
export const UPDATE_LIQUIDITY_AND_TOKENS_BALANCE_STOP =
  'UPDATE_LIQUIDITY_AND_TOKENS_BALANCE_STOP'
export const UPDATE_CURRENT_TOKEN_PRICE = 'UPDATE_CURRENT_TOKEN_PRICE'
export const RESET_TOKEN_PRICE = 'RESET_TOKEN_PRICE'

export const CUSTOM_EXCHANGE_ACTIONS = [
  ACTION_.ORDER_CREATE,
  RELAY_OPEN_WEBSOCKET_TICKER,
  RELAY_OPEN_WEBSOCKET_BOOK,
  FETCH_CANDLES_DATA_SINGLE_START,
  FETCH_CANDLES_DATA_SINGLE_STOP,
  RELAY_CLOSE_WEBSOCKET,
  FETCH_ACCOUNT_ORDERS_START,
  FETCH_ACCOUNT_ORDERS_STOP,
  MONITOR_EXCHANGE_EVENTS_START,
  MONITOR_EXCHANGE_EVENTS_STOP,
  ACTION_.RELAY_CONNECT
]
