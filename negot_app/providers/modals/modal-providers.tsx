import { ConnectAccountModal } from "@/modals/connect-account-modal";

export function ModalProvider({children}: {children: React.ReactNode}) {
    return (
        <>
        {children}

        <ConnectAccountModal/>
        </>
    )
}