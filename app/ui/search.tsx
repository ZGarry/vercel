'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: '股票名称' | '市盈率' }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

// Inside the Search Component...
const handleSearch = useDebouncedCallback((term) => {
  // console.log(`Searching... ${term}`);
 
  const params = new URLSearchParams(searchParams);
  params.set('page', '1');
  if (term) {
    params.set(placeholder === '股票名称' ? 'query' : 'queryrate', term);
  } else {
    params.delete('query');
    params.delete('queryrate')
  }
  replace(`${pathname}?${params.toString()}`);
}, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={`Search ${placeholder}`}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get(placeholder === '股票名称' ? 'query' : 'queryrate')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
