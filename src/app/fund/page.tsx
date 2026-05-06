import { TrendingUp, Construction } from "lucide-react";

export default function FundPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">
        基金
      </h1>
      <p className="mt-2 text-stone-600 dark:text-stone-400">
        投资理财记录与分析。
      </p>

      <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white p-12 text-center shadow-sm dark:border-stone-700 dark:bg-stone-800">
        <div className="rounded-full bg-indigo-50 p-4 text-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400">
          <Construction size={32} />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-stone-900 dark:text-stone-50">
          功能建设中
        </h2>
        <p className="mt-2 max-w-md text-stone-500 dark:text-stone-400">
          基金模块正在开发中，后续将支持展示关注基金列表、净值走势以及分析文章。
        </p>

        <div className="mt-8 grid w-full max-w-lg gap-4 md:grid-cols-3">
          {[
            { icon: TrendingUp, title: "基金列表", desc: "手动维护关注的基金" },
            { icon: TrendingUp, title: "净值展示", desc: "接入 API 展示实时数据" },
            { icon: TrendingUp, title: "分析文章", desc: "发布基金研究笔记" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-stone-100 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-900/50"
            >
              <item.icon
                size={20}
                className="mx-auto text-indigo-500 dark:text-indigo-400"
              />
              <p className="mt-2 text-sm font-medium text-stone-900 dark:text-stone-50">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
