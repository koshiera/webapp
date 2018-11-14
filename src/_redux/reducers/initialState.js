// Copyright 2016-2017 Rigo Investment Sagl.

import {
  DEFAULT_ENDPOINT,
  DEFAULT_NETWORK_NAME,
  ENDPOINTS,
  ERC20_TOKENS,
  ERCdEX,
  EXCHANGES,
  Ethfinex,
  MSG_NETWORK_STATUS_OK,
  NETWORKS,
  NETWORK_OK,
  RELAYS,
  TRADE_TOKENS_PAIRS
} from '../../_utils/const'

import BigNumber from 'bignumber.js'

const NETWORK_NAME = DEFAULT_NETWORK_NAME
// const NETWORK_NAME = 'ropsten'
// const BASE_TOKEN = ERC20_TOKENS[NETWORK_NAME].ETH
// const QUOTE_TOKEN = ERC20_TOKENS[NETWORK_NAME].USDT

const BASE_TOKEN = ERC20_TOKENS[NETWORK_NAME].ZRX
const QUOTE_TOKEN = ERC20_TOKENS[NETWORK_NAME].WETH

// const ERCdEX = 'ERCdEX'
// const Ethfinex = 'Ethfinex'

const initialState = {
  app: {
    isConnected: false,
    isSyncing: false,
    syncStatus: {},
    appLoading: true,
    retryTimeInterval: 0,
    connectinoRetries: 0,
    lastBlockNumberUpdate: 0,
    accountsAddressHash: '',
    errorEventfulSubscription: false,
    config: {
      isMock: false
    },
    transactionsDrawerOpen: false
  },
  notifications: {
    engine: ''
  },
  exchange: {
    tradesHistory: [],
    ui: {
      panels: {
        relayBox: {
          expanded: true
        },
        orderBox: {
          expanded: true
        },
        ordersHistoryBox: {
          expanded: true
        }
      }
    },
    loading: {
      liquidity: true,
      orderSummary: true,
      orderBox: true,
      marketBox: true
    },
    availableFunds: [],
    chartData: [],
    selectedFund: {
      details: {},
      liquidity: {
        loading: true,
        ETH: new BigNumber(0),
        WETH: new BigNumber(0),
        ZRX: new BigNumber(0),
        baseToken: {
          balance: new BigNumber(0),
          balanceWrapper: new BigNumber(0)
        },
        quoteToken: {
          balance: new BigNumber(0),
          balanceWrapper: new BigNumber(0)
        }
      },
      managerAccount: ''
    },
    accountSignature: {
      signature: '',
      nonce: '',
      valid: false
    },
    walletAddress: '',
    selectedExchange: EXCHANGES.ERCdEX[NETWORK_NAME],
    selectedRelay: RELAYS[ERCdEX],
    availableRelays: {},
    // selectedExchange: EXCHANGES.rigoBlock[DEFAULT_NETWORK_NAME],
    selectedTokensPair: {
      baseToken: BASE_TOKEN,
      baseTokenLockedAmount: new BigNumber(0),
      baseTokenAvailableAmount: new BigNumber(0),
      quoteToken: QUOTE_TOKEN,
      quoteTokenLockedAmount: new BigNumber(0),
      quoteTokenAvailableAmount: new BigNumber(0),
      baseTokenWrapperBalance: new BigNumber(0),
      quoteTokenWrapperBalance: new BigNumber(0),
      baseTokenAllowance: false,
      quoteTokenAllowance: false,
      baseTokenLockWrapExpire: '0',
      quoteTokenLockWrapExpire: '0',
      ticker: {
        current: {
          price: '0'
        },
        previous: {
          price: '0'
        },
        variation: 0
      }
    },
    availableTradeTokensPairs: TRADE_TOKENS_PAIRS,
    fundOrders: {
      open: [],
      history: [],
      cancelled: [],
      executed: []
    },
    selectedOrder: {
      details: {},
      orderAmountError: true,
      orderPriceError: true,
      orderFillAmount: '0',
      orderMaxAmount: '0',
      orderPrice: '0',
      orderType: 'asks',
      takerOrder: false,
      selectedTokensPair: {
        baseToken: BASE_TOKEN,
        quoteToken: QUOTE_TOKEN
      }
    },
    orderBookAggregated: true,
    orderBook: {
      asks: [],
      bids: [],
      spread: '0'
    },
    relay: {
      url: 'https://api.ercdex.com/api/standard',
      networkId: '42'
    },
    prices: {
      previous: {},
      current: {}
    }
  },
  transactions: {
    queue: new Map(),
    pending: 0
  },
  transactionsDrago: {
    dragosList: {
      list: [],
      lastFetchRange: {
        chunk: {
          key: 0,
          toBlock: 0,
          fromBlock: 0
        },
        startBlock: 0,
        lastBlock: 0
      }
    },
    holder: {
      balances: [],
      logs: []
    },
    manager: {
      list: [],
      logs: []
    },
    selectedDrago: {
      values: {
        portfolioValue: -1,
        totalAssetsValue: -1,
        estimatedPrice: -1
      },
      details: {},
      transactions: [],
      assets: [],
      assetsCharts: {}
    }
  },
  transactionsVault: {
    vaultsList: {
      list: [],
      lastFetchRange: {
        chunk: {
          key: 0,
          toBlock: 0,
          fromBlock: 0
        },
        startBlock: 0,
        lastBlock: 0
      }
    },
    holder: {
      balances: [],
      logs: []
    },
    manager: {
      list: [],
      logs: []
    },
    selectedVault: {
      details: {},
      transactions: []
    }
  },
  endpoint: {
    accounts: [],
    accountsBalanceError: false,
    ethBalance: new BigNumber(0),
    grgBalance: new BigNumber(0),
    endpointInfo: ENDPOINTS[DEFAULT_ENDPOINT],
    networkInfo: NETWORKS[DEFAULT_NETWORK_NAME],
    loading: true,
    networkError: NETWORK_OK,
    networkStatus: MSG_NETWORK_STATUS_OK,
    prevBlockNumber: '0',
    prevNonce: '0',
    warnMsg: '',
    isMetaMaskNetworkCorrect: false,
    isMetaMaskLocked: true,
    lastMetaMaskUpdateTime: 0,
    openWalletSetup: false
  },
  user: {
    isManager: false
  }
}

export default initialState
