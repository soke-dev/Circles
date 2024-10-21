
import WalletProvider from '@/providers/walletProvider'
import ProfileForm from './components/profile-form'


export default function ProfilePage() {

  // const activeAccount = useActiveAccount();


  const getProfile = async (wallet: string) => {
    // const profile = await getAccount(activeAccount?.address);
    // if (profile) {
    //   setState({ name: profile.name, twitter: profile.twitter ?? '', discord: profile.discord ?? '', currency: profile.currency });
    // }
  }


  return (

    <WalletProvider>
      <ProfileForm   />
    </WalletProvider>

  )
}
