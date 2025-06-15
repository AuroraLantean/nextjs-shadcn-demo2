"use client";
import React from "react";
import { SidebarTrigger, useSidebar } from "@ui/sidebar";
import { AlignJustify } from "lucide-react";
import { Button } from "./ui/button";

const MobileMenu = () => {
	const {
		state,
		open,
		setOpen,
		openMobile,
		setOpenMobile,
		isMobile,
		toggleSidebar,
	} = useSidebar();
	return (
		<div>
			<Button onClick={toggleSidebar} className="bg-sky-700">
				<AlignJustify />
			</Button>
		</div>
	);
};
export default MobileMenu;
/*
<div className="sm:px-9 sm:hidden size-6">
	<SidebarTrigger />
</div>
*/
