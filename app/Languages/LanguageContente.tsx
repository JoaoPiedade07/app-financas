import React, { createContext, useState, useContext, ReactNode} from 'react';

export const translations = {
    en: {
        // Existing translations
        name: "Name",
        category: "Category",
        settings: "Settings",
        language: "Language",
        home: "Home",
        finances: "Finances",
        budget: "Budget",
        profile: "Profile",
        earnings: "Earnings",
        recipes: "Recipes",
        expenses: "Expenses",
        expensesByCategory: "Expenses by category",
        food: "Food",
        transport: "Transport",
        personal: "Personal",
        upcomingBills: "Upcoming Bills",
        weekTransactions: "Week Transactions",
        transactions: "Transactions",
        newTransaction: "New Transaction",
        price: "Price",
        date: "Date",
        addRecipe: "Add Recipe",
        addExpense: "Add Expense",
        addUpcomingBill: "Add Upcoming Bill",
        closeCalendar: "Close Calendar",
        deleteTransaction: "Delete Transaction",
        deleteConfirmation: "Are you sure you want to delete this transaction?",
        cancel: "Cancel",
        delete: "Delete",
        
        
        // Error handling translations
        error: "Error",
        networkError: "Network error. Please check your connection.",
        tryAgain: "Try Again",
        somethingWentWrong: "Something went wrong",
        tryAgainLater: "Please try again later",
        noBudgetsFound: "No budgets found for this category",
        noTransactionsFound: "No transactions found",
        noUpcomingBillsFound: "No upcoming bills found",
        loadingData: "Loading data...",
        remaining: "remaining"
    },
    pt: {
        // Existing translations
        name: "Nome",
        category: "Categoria",
        settings: "Configurações",
        language: "Idioma",
        home: "Início",
        finances: "Finanças",
        budget: "Orçamento",
        profile: "Perfil",
        earnings: "Ganhos",
        recipes: "Receitas",
        expenses: "Despesas",
        expensesByCategory: "Despesas por categoria",
        food: "Alimentação",
        transport: "Transporte",
        personal: "Pessoal",
        upcomingBills: "Contas Futuras",
        weekTransactions: "Transações da Semana",
        transactions: "Transações",
        newTransaction: "Nova Transação",
        price: "Preço",
        date: "Data",
        addRecipe: "Adicionar Receita",
        addExpense: "Adicionar Despesa",
        addUpcomingBill: "Adicionar Conta Futura",
        closeCalendar: "Fechar Calendário",
        deleteTransaction: "Excluir Transação",
        deleteConfirmation: "Tem certeza que deseja excluir esta transação?",
        cancel: "Cancelar",
        delete: "Excluir",
        
        // Error handling translations
        error: "Erro",
        networkError: "Erro de rede. Verifique sua conexão.",
        tryAgain: "Tentar Novamente",
        somethingWentWrong: "Algo deu errado",
        tryAgainLater: "Por favor, tente novamente mais tarde",
        noBudgetsFound: "Nenhum orçamento encontrado para esta categoria",
        noTransactionsFound: "Nenhuma transação encontrada",
        loadingData: "Carregando dados...",
        remaining: "restante"
    },
    // Add error translations for other languages as well
    es: {
        // Existing translations
        name: "Nombre",
        category: "Categoría",
        settings: "Ajustes",
        language: "Idioma",
        home: "Inicio",
        finances: "Finanzas",
        budget: "Presupuesto",
        profile: "Perfil",
        earnings: "Ingresos",
        recipes: "Recetas",
        expenses: "Gastos",
        expensesByCategory: "Gastos por categoría",
        food: "Alimentación",
        transport: "Transporte",
        personal: "Personal",
        upcomingBills: "Facturas Próximas",
        weekTransactions: "Transacciones de la Semana",
        transactions: "Transacciones",
        newTransaction: "Nueva Transacción",
        price: "Precio",
        date: "Fecha",
        addRecipe: "Añadir Receta",
        addExpense: "Añadir Gasto",
        addUpcomingBill: "Añadir Factura Próxima",
        closeCalendar: "Cerrar Calendario",
        deleteTransaction: "Eliminar Transacción",
        deleteConfirmation: "¿Estás seguro de que quieres eliminar esta transacción?",
        cancel: "Cancelar",
        delete: "Eliminar"
    },
    ja: {
        name: "名前",
        category: "カテゴリー",
        settings: "設定",
        language: "言語",
        home: "ホーム",
        finances: "財務",
        budget: "予算",
        profile: "プロフィール",
        earnings: "収入",
        recipes: "レシピ",
        expenses: "支出",
        expensesByCategory: "カテゴリー別支出",
        food: "食費",
        transport: "交通費",
        personal: "個人",
        upcomingBills: "今後の請求",
        weekTransactions: "週間取引",
        transactions: "取引",
        newTransaction: "新規取引",
        price: "価格",
        date: "日付",
        addRecipe: "レシピを追加",
        addExpense: "支出を追加",
        addUpcomingBill: "今後の請求を追加",
        closeCalendar: "カレンダーを閉じる",
        deleteTransaction: "取引を削除",
        deleteConfirmation: "この取引を削除してもよろしいですか？",
        cancel: "キャンセル",
        delete: "削除"
    },
    zh: {
        name: "姓名",
        category: "类别",
        settings: "设置",
        language: "语言",
        home: "首页",
        finances: "财务",
        budget: "预算",
        profile: "个人资料",
        earnings: "收入",
        recipes: "收款",
        expenses: "支出",
        expensesByCategory: "按类别支出",
        food: "食品",
        transport: "交通",
        personal: "个人",
        upcomingBills: "即将到来的账单",
        weekTransactions: "本周交易",
        transactions: "交易",
        newTransaction: "新交易",
        price: "价格",
        date: "日期",
        addRecipe: "添加收款",
        addExpense: "添加支出",
        addUpcomingBill: "添加即将到来的账单",
        closeCalendar: "关闭日历",
        deleteTransaction: "删除交易",
        deleteConfirmation: "您确定要删除此交易吗？",
        cancel: "取消",
        delete: "删除"
    },
    de: {
        name: "Name",
        category: "Kategorie",
        settings: "Einstellungen",
        language: "Sprache",
        home: "Startseite",
        finances: "Finanzen",
        budget: "Budget",
        profile: "Profil",
        earnings: "Einnahmen",
        recipes: "Rezepte",
        expenses: "Ausgaben",
        expensesByCategory: "Ausgaben nach Kategorie",
        food: "Lebensmittel",
        transport: "Transport",
        personal: "Persönlich",
        upcomingBills: "Anstehende Rechnungen",
        weekTransactions: "Wochentransaktionen",
        transactions: "Transaktionen",
        newTransaction: "Neue Transaktion",
        price: "Preis",
        date: "Datum",
        addRecipe: "Rezept hinzufügen",
        addExpense: "Ausgabe hinzufügen",
        addUpcomingBill: "Anstehende Rechnung hinzufügen",
        closeCalendar: "Kalender schließen",
        deleteTransaction: "Transaktion löschen",
        deleteConfirmation: "Sind Sie sicher, dass Sie diese Transaktion löschen möchten?",
        cancel: "Abbrechen",
        delete: "Löschen"
    }
};

// Define the type for language context
interface LanguageContextType {
    currentLanguage: string;
    setCurrentLanguage: (lang: string) => void;
    getText: (key: string) => string;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create the provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children}) => {
    const [currentLang, setCurrentLang] = useState('en');
    const [error, setError] = useState<string | null>(null);

    // Function to get text based on current language with error handling
    const getText = (key: string) => {
        try {
            const selectedLanguage = translations[currentLang as keyof typeof translations];
            if (!selectedLanguage) {
                console.warn(`Language '${currentLang}' not found, falling back to English`);
                return translations.en[key as keyof typeof translations.en] || key;
            }
            return (key in selectedLanguage) ? selectedLanguage[key as keyof typeof selectedLanguage] : key;
        } catch (err) {
            console.error('Error getting translation:', err);
            setError('Error loading translations');
            return key; // Return the key itself as fallback
        }
    };

    return (
        <LanguageContext.Provider value = {{
            currentLanguage: currentLang,
            setCurrentLanguage: setCurrentLang,
            getText
        }}>
            {error ? (
                <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: 'red' }}>{error}</span>
                </div>
            ) : (
                children
            )}
        </LanguageContext.Provider> 
    );
};

// Export a hook to use the language context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if(!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    } 
    return context;
}

export default LanguageProvider;