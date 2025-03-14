import { Redirect } from 'expo-router';
import { ThemeProvider } from '@/components/ThemeContext';
import { TransactionProvider } from './Transactions/TransactionContext';

const StartPage = () => {
    return (
        <ThemeProvider>
            <TransactionProvider>
                <Redirect href = "/home" />;
            </TransactionProvider>
        </ThemeProvider>
    )
};

export default StartPage;

