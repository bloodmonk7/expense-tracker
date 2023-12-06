import { currencyFormatter } from '@/lib/utils';

export default function ExpenseCategoryItem({ color, title, total }) {
  return (
    <button>
      <div className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-2xl">
        <div className="flex items-center gap-2">
          <div
            className="w-[25px] h-[25px] rounded-full"
            style={{ backgroundColor: color }}
          />
          <div className="capitalize">{title}</div>
        </div>
        <div>
          <p>{currencyFormatter(total)}</p>
        </div>
      </div>
    </button>
  );
}
