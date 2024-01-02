'use client';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  const exit = () => {
    Cookies.remove('token');
    window.location.href = '/';
  }

  return (
    <>
      <header>
        <nav className="relative flex w-full border-solid border-b-2 items-center justify-between bg-white py-2 text-neutral-600 hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div className="flex items-center">
              <p className="border-0 px-2 text-xl leading-none transition-shadow duration-150 ease-in-out">
                Şampiyonlar Ligi
              </p>
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button>Çıkış Yap</Button>
            </div>
          </div>
        </nav>
      </header>
      <div className="flex w-full h-screen p-2">{children}</div>
    </>
  );
}
