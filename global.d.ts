// global.d.ts
export {};
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: any) => void; auto_select: boolean }) => void;
          renderButton: (element: HTMLElement | null, options: { size: string; theme: string }) => void;
          prompt: () => void;
        };
      };
    };
  }
}