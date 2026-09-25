'use client';

import React, {forwardRef, useEffect, useState} from 'react';
import NextLink from 'next/link';
import {usePathname, useRouter, useParams as useNextParams} from 'next/navigation';

export type FetcherWithComponents<T = any> = any;
export type Fetcher<T = any> = any;
export {redirect} from 'next/navigation';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  href?: string;
  prefetch?: any;
  end?: boolean;
  className?: any;
  children?: React.ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  {to, href, prefetch, className, children, ...props},
  ref,
) {
  const targetHref = (to || href || '#') as string;
  const computedClassName = typeof className === 'function' ? className({isActive: false, isPending: false}) : className;

  return (
    <NextLink ref={ref} href={targetHref} className={computedClassName} {...(props as any)}>
      {children}
    </NextLink>
  );
});

export const NavLink = forwardRef<HTMLAnchorElement, LinkProps>(function NavLink(
  {to, href, prefetch, end, className, children, ...props},
  ref,
) {
  const pathname = usePathname();
  const targetHref = (to || href || '#') as string;
  const cleanTarget = targetHref.replace(/\/+$/, '') || '/';
  const cleanCurrent = pathname ? pathname.replace(/\/+$/, '') || '/' : '/';
  
  const isActive = end
    ? cleanCurrent === cleanTarget
    : cleanCurrent === cleanTarget || (cleanTarget !== '/' && cleanCurrent.startsWith(cleanTarget));

  const computedClassName =
    typeof className === 'function'
      ? className({isActive, isPending: false})
      : `${className || ''} ${isActive ? 'active' : ''}`.trim();

  return (
    <NextLink ref={ref} href={targetHref} className={computedClassName} {...(props as any)}>
      {children}
    </NextLink>
  );
});

export function useLocation() {
  const pathname = usePathname() || '/';
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearch(window.location.search);
    }
  }, [pathname]);

  return {
    pathname,
    search,
    hash: '',
    key: 'default',
    state: null,
  };
}

export function useNavigate() {
  const router = useRouter();
  return (to: string | number, options?: any) => {
    if (typeof to === 'number') {
      if (to === -1) router.back();
      return;
    }
    if (options?.replace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  };
}

export function useParams<T extends Record<string, string | string[]>>() {
  return (useNextParams() || {}) as T;
}

export function useSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchParams, setSearchParamsState] = useState<URLSearchParams>(() => new URLSearchParams());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearchParamsState(new URLSearchParams(window.location.search));
    }
  }, [pathname]);

  const setSearchParams = (
    nextInit: Record<string, string> | URLSearchParams | ((prev: URLSearchParams) => URLSearchParams),
  ) => {
    const current = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    let updated: URLSearchParams;
    if (typeof nextInit === 'function') {
      updated = nextInit(current);
    } else if (nextInit instanceof URLSearchParams) {
      updated = nextInit;
    } else {
      updated = new URLSearchParams(nextInit);
    }
    setSearchParamsState(updated);
    router.replace(`${pathname}?${updated.toString()}`);
  };

  return [searchParams, setSearchParams] as const;
}

export function useFetcher<T = any>(_options?: any) {
  const [data, setData] = React.useState<T | null>(null);
  const [state, setState] = React.useState<'idle' | 'submitting' | 'loading'>('idle');
  const [formData, setFormData] = React.useState<FormData | null>(null);

  const load = async (url: string) => {
    setState('loading');
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setState('idle');
    }
  };

  const submit = async (target: any, options?: any) => {
    setState('submitting');
    try {
      let body: any;
      let action = typeof target === 'string' ? target : options?.action || '/';
      let method = options?.method || 'POST';

      if (target instanceof FormData || target instanceof HTMLFormElement) {
        body = target instanceof HTMLFormElement ? new FormData(target) : target;
        setFormData(body);
      } else if (typeof target === 'object') {
        body = JSON.stringify(target);
      }

      const res = await fetch(action, {
        method,
        body,
      });
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setState('idle');
    }
  };

  const Form = ({children, action, method = 'post', onSubmit, ...props}: any) => (
    <form
      action={action}
      method={method}
      onSubmit={(e) => {
        if (onSubmit) onSubmit(e);
        if (!e.defaultPrevented) {
          e.preventDefault();
          submit(new FormData(e.currentTarget), {action, method});
        }
      }}
      {...props}
    >
      {children}
    </form>
  );

  return {
    data,
    state,
    formData,
    load,
    submit,
    Form,
  };
}

export function Await<T>({
  resolve,
  children,
}: {
  resolve: Promise<T> | T;
  children: (resolved: T) => React.ReactNode;
}) {
  if (resolve && typeof (resolve as any).then === 'function') {
    const [value, setValue] = React.useState<T | null>(null);
    React.useEffect(() => {
      Promise.resolve(resolve).then(setValue);
    }, [resolve]);
    if (value === null) return null;
    return <>{children(value)}</>;
  }
  return <>{children(resolve as T)}</>;
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  action?: any;
  method?: any;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(function Form(
  {children, action, method = 'get', onSubmit, ...props},
  ref,
) {
  return (
    <form
      ref={ref}
      action={action}
      method={method}
      onSubmit={(e) => {
        if (onSubmit) onSubmit(e);
      }}
      {...props}
    >
      {children}
    </form>
  );
});

export function useRouteLoaderData<T>(_routeId: string): T | undefined {
  return undefined;
}
