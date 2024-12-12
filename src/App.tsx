import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from './components/ui/theme';
import { MainLayout } from './components/layout/MainLayout';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </ThemeProvider>
    </Router>
  );
}

export default App;