import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

interface HeaderProps {
  docsOpen: boolean;
  setDocsOpen: (open: boolean) => void;
  mainDownloadOpen: boolean;
  setMainDownloadOpen: (open: boolean) => void;
  handleDownload: () => void;
}

const Header = ({ docsOpen, setDocsOpen, mainDownloadOpen, setMainDownloadOpen, handleDownload }: HeaderProps) => {
  const { user, isLoading, login, logout } = useGoogleAuth();

  return (
    <header className="container mx-auto px-4 py-8">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-3 animate-fade-in">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center animate-glow">
            <Icon name="Gamepad2" className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-rajdhani font-bold text-foreground">BROWSER GAMES</h1>
        </div>

      </nav>
    </header>
  );
};

export default Header;