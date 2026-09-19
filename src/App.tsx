import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import LobbyScreen from './screens/LobbyScreen'
import MatchScreen from './screens/MatchScreen'
import ResultScreen from './screens/ResultScreen'
import DepositScreen from './screens/DepositScreen'
import WithdrawScreen from './screens/WithdrawScreen'
import RewardsScreen from './screens/RewardsScreen'
import ProfileScreen from './screens/ProfileScreen'
import WalletScreen from './screens/WalletScreen'
import RankingScreen from './screens/RankingScreen'
import PlinkoScreen from './screens/PlinkoScreen'
import GamesHubScreen from './screens/GamesHubScreen'
import ChatScreen from './screens/ChatScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import SettingsScreen from './screens/SettingsScreen'
import ResponsiblePlayScreen from './screens/ResponsiblePlayScreen'
import KycScreen from './screens/KycScreen'
import SupportScreen from './screens/SupportScreen'
import TournamentsScreen from './screens/TournamentsScreen'
import PromotionsScreen from './screens/PromotionsScreen'
import FriendsScreen from './screens/FriendsScreen'
import FirstRunSheet from './screens/FirstRunSheet'
import TermsScreen from './screens/legal/TermsScreen'
import PrivacyScreen from './screens/legal/PrivacyScreen'
import BonusTermsScreen from './screens/legal/BonusTermsScreen'
import GameRulesScreen from './screens/legal/GameRulesScreen'
import FairnessScreen from './screens/legal/FairnessScreen'
import LicenseScreen from './screens/legal/LicenseScreen'
import AmlScreen from './screens/legal/AmlScreen'
import ComplaintsScreen from './screens/legal/ComplaintsScreen'
import AboutScreen from './screens/legal/AboutScreen'
import BottomNav from './components/BottomNav'
import SplashScreen from './screens/SplashScreen'

export type Screen =
  | 'splash' | 'firstRun'
  | 'home' | 'games' | 'plinko'
  | 'lobby' | 'match' | 'result' | 'ranking'
  | 'deposit' | 'withdraw' | 'wallet'
  | 'rewards' | 'tournaments' | 'promotions' | 'friends'
  | 'chat' | 'profile' | 'notifications' | 'settings'
  | 'responsible' | 'kyc' | 'support'
  | 'terms' | 'privacy' | 'bonusTerms' | 'gameRules'
  | 'fairness' | 'license' | 'aml' | 'complaints' | 'about'

const FIRST_RUN_KEY = 'borabet:first-run-done'
const hasSeenFirstRun = () => {
  try { return localStorage.getItem(FIRST_RUN_KEY) === '1' } catch { return false }
}
const markFirstRunSeen = () => {
  try { localStorage.setItem(FIRST_RUN_KEY, '1') } catch { /* storage unavailable */ }
}

type Tab = 'home' | 'games' | 'rewards' | 'menu'

// Which bottom-nav tab is highlighted for each screen
const tabForScreen = (s: Screen): Tab => {
  switch (s) {
    case 'games': case 'plinko': return 'games'
    case 'rewards': case 'tournaments': case 'promotions': return 'rewards'
    case 'profile': case 'wallet': case 'withdraw': case 'friends': case 'settings':
    case 'responsible': case 'support': case 'kyc':
    case 'terms': case 'privacy': case 'bonusTerms': case 'gameRules':
    case 'fairness': case 'license': case 'aml': case 'complaints': case 'about':
      return 'menu'
    default: return 'home'
  }
}

export type MatchResult = 'win' | 'loss' | 'draw'

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [matchResult, setMatchResult] = useState<MatchResult>('win')
  const [balance, setBalance] = useState(2480)

  const navigate = (s: Screen) => setScreen(s)

  const handleMatchEnd = (result: MatchResult) => {
    setMatchResult(result)
    if (result === 'win') setBalance(b => b + 450)
    else if (result === 'loss') setBalance(b => b - 500)
    navigate('result')
  }

  if (screen === 'splash') {
    return <SplashScreen onDone={() => navigate(hasSeenFirstRun() ? 'home' : 'firstRun')} />
  }
  if (screen === 'firstRun') {
    return <FirstRunSheet onDone={() => { markFirstRunSeen(); navigate('home') }} />
  }

  const showNav = !['match', 'result', 'lobby', 'kyc', 'chat'].includes(screen)

  const navScreenMap: Record<string, Screen> = {
    home: 'home', games: 'games', rewards: 'rewards', menu: 'profile',
  }

  return (
    <div
      className="relative flex flex-col h-dvh overflow-hidden"
      style={{ background: '#070A14', maxWidth: 480, margin: '0 auto' }}
    >
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {screen === 'home' && (
          <HomeScreen
            balance={balance}
            onPlay={() => navigate('lobby')}
            onDeposit={() => navigate('deposit')}
            onRanking={() => navigate('ranking')}
            onChat={() => navigate('chat')}
            onTournaments={() => navigate('tournaments')}
            onPromotions={() => navigate('promotions')}
            onNotifications={() => navigate('notifications')}
          />
        )}
        {screen === 'games' && <GamesHubScreen onBack={() => navigate('home')}
          onDomino={() => navigate('lobby')} onPlinko={() => navigate('plinko')} />}
        {screen === 'plinko' && <PlinkoScreen onBack={() => navigate('home')}
          onDeposit={() => navigate('deposit')} />}
        {screen === 'lobby' && <LobbyScreen balance={balance}
          onBack={() => navigate('home')} onMatch={() => navigate('match')} />}
        {screen === 'match' && <MatchScreen onEnd={handleMatchEnd} />}
        {screen === 'result' && <ResultScreen result={matchResult} pot={500}
          onRematch={() => navigate('match')} onExit={() => navigate('home')} />}
        {screen === 'deposit' && <DepositScreen onBack={() => navigate('home')} />}
        {screen === 'withdraw' && <WithdrawScreen onBack={() => navigate('wallet')}
          onKyc={() => navigate('kyc')} />}
        {screen === 'rewards' && <RewardsScreen onBack={() => navigate('home')} />}
        {screen === 'tournaments' && <TournamentsScreen onBack={() => navigate('home')} />}
        {screen === 'promotions' && <PromotionsScreen onBack={() => navigate('home')} />}
        {screen === 'friends' && <FriendsScreen onBack={() => navigate('home')} />}
        {screen === 'chat' && <ChatScreen onBack={() => navigate('home')} />}
        {screen === 'profile' && <ProfileScreen balance={balance}
          onBack={() => navigate('home')} onWallet={() => navigate('wallet')}
          onFriends={() => navigate('friends')} onSettings={() => navigate('settings')}
          onResponsible={() => navigate('responsible')} onSupport={() => navigate('support')} />}
        {screen === 'wallet' && <WalletScreen onBack={() => navigate('profile')}
          onWithdraw={() => navigate('withdraw')} onDeposit={() => navigate('deposit')} />}
        {screen === 'ranking' && <RankingScreen onBack={() => navigate('home')} />}
        {screen === 'notifications' && <NotificationsScreen onBack={() => navigate('home')} />}
        {screen === 'settings' && <SettingsScreen onBack={() => navigate('profile')}
          onLegal={(l) => navigate(l as Screen)} />}
        {screen === 'responsible' && <ResponsiblePlayScreen onBack={() => navigate('profile')} />}
        {screen === 'kyc' && <KycScreen onBack={() => navigate('withdraw')}
          onDone={() => navigate('withdraw')} />}
        {screen === 'support' && <SupportScreen onBack={() => navigate('profile')} />}
        {screen === 'terms' && <TermsScreen onBack={() => navigate('settings')} />}
        {screen === 'privacy' && <PrivacyScreen onBack={() => navigate('settings')} />}
        {screen === 'bonusTerms' && <BonusTermsScreen onBack={() => navigate('settings')} />}
        {screen === 'gameRules' && <GameRulesScreen onBack={() => navigate('settings')} />}
        {screen === 'fairness' && <FairnessScreen onBack={() => navigate('settings')} />}
        {screen === 'license' && <LicenseScreen onBack={() => navigate('settings')} />}
        {screen === 'aml' && <AmlScreen onBack={() => navigate('settings')} />}
        {screen === 'complaints' && <ComplaintsScreen onBack={() => navigate('settings')} />}
        {screen === 'about' && <AboutScreen onBack={() => navigate('settings')} />}
      </div>

      {showNav && (
        <BottomNav active={tabForScreen(screen)}
          onChange={(tab) => navigate(navScreenMap[tab] as Screen)}
          onDeposit={() => navigate('deposit')} />
      )}
    </div>
  )
}
