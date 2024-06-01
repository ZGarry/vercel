import { fetchFilteredInvoices } from '@/app/lib/data';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';
import { DeleteInvoice, UpdateInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import Image from 'next/image';

export default async function InvoicesTable({
                                              query,
                                              queryrate,
                                              currentPage,
                                              all_data
                                            }: {
  query: string,
  queryrate:string
  currentPage: number,
  all_data: any[]
}) {
  // const invoices = await fetchFilteredInvoices(query, currentPage);
// 计算起始索引和结束索引
  // 筛选满足条件的数据

  let filteredData = query ? all_data.filter(item => item['名称'].includes(query)) : all_data;
  filteredData =  queryrate?filteredData.filter(item => item['市盈率-动态']<queryrate && item['市盈率-动态']>0):filteredData;
  const startIndex: number = (currentPage - 1) * 50;
  const endIndex: number = currentPage * 50;


// 筛选得到当前页的数据
  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  代码
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  名称
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  市净率
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  市盈率-动态
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentPageData?.map((data) => (
                <tr
                  key={data["代码"]}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{data["代码"]}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data["名称"]}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data["市净率"]}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {data["市盈率-动态"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
