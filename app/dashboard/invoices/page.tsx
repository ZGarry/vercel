import {fetchInvoicesPages} from '@/app/lib/data';
import {lusitana} from '@/app/ui/fonts';
import {CreateInvoice} from '@/app/ui/invoices/buttons';
import Pagination from '@/app/ui/invoices/pagination';
import Table from '@/app/ui/invoices/table';
import Search from '@/app/ui/search';
import {InvoicesTableSkeleton} from '@/app/ui/skeletons';
import {Metadata} from 'next';
import {Suspense} from 'react';
import {rpc} from "@/app/lib/fetch";

export const metadata: Metadata = {
    title: 'Invoices',
};

export default async function Page({
                                       searchParams,
                                   }: {
    searchParams?: {
        query?: string;
        queryrate?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const queryrate = searchParams?.queryrate || '';
    const currentPage = Number(searchParams?.page) || 1;
    // const totalPages = await fetchInvoicesPages(query);
    const all_data: any[] = await rpc("/api/all_stock");
    let filteredData = query ? all_data.filter(item => item['名称'].includes(query)) : all_data;
    filteredData =  queryrate?filteredData.filter(item => item['市盈率-动态']<queryrate && item['市盈率-动态']>0):filteredData;
    const totalPages = Math.ceil(filteredData.length / 50);


    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>股票面板</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="股票名称"/>
                <Search placeholder="市盈率"/>
                {/*<CreateInvoice />*/}
            </div>


            {/*<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>*/}
            <Table query={query} queryrate={queryrate} currentPage={currentPage} all_data={all_data}/>
            {/*</Suspense>*/}
            {/*先不支持页码*/}
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages}/>
            </div>
        </div>
    );
}