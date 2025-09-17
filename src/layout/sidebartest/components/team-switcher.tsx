import { useSidebar } from "@/components/ui/sidebar";

export function TeamSwitcher() {
  const { open } = useSidebar()

  return (
    <div className={`bg-gradient-to-r rounded-md flex border-0 text-white from-red-500/20 to-blue-500/20 py-1 px-${!open?"0":"1"} gap-1 border-red-500/30`}>
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        {/* <Link to="/dashboard"> */}
        {/* <img src={Nlogo} alt="logo" className="h-8  w-8 object-contain" /> */}
        <span className="text-white text-3xl text-center">W</span>
        {/* </Link> */}
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">Woodrock</span>
        <span className="truncate text-xs">Group private limited</span>
      </div>
    </div>
  );
}
