import { Redirect } from 'expo-router';
import { ThemeProvider } from '@/components/ThemeContext';

const StartPage = () => {
    return (
        <ThemeProvider>
            <Redirect href = "/home" />;
        </ThemeProvider>
    )
};

export default StartPage;

