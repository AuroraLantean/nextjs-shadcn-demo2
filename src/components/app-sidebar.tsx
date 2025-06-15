"use client";

import type * as React from "react";
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	MapPin,
	PieChart,
	Settings2,
	SquareTerminal,
} from "lucide-react";

import { NavMain } from "@components/nav-main";
import { NavProjects } from "@components/nav-projects";
import { NavUser } from "@components/nav-user";
import { TeamSwitcher } from "@components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@ui/sidebar";

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/profile.svg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Bitcoin Runes",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Dashboard",
					url: "/dashboard",
				},
				{
					title: "Activity",
					url: "/dashboard/activity",
				},
				{
					title: "Balances",
					url: "/dashboard/balances",
				},
			],
		},
		{
			title: "NextJs Demo",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Snippets",
					url: "/snippets",
				},
				{
					title: "new snippet",
					url: "/snippets/new",
				},
				{
					title: "Page3",
					url: "#",
				},
			],
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Introduction",
					url: "#",
				},
				{
					title: "Get Started",
					url: "#",
				},
				{
					title: "Tutorials",
					url: "#",
				},
				{
					title: "Changelog",
					url: "#",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "General",
					url: "#",
				},
				{
					title: "Team",
					url: "#",
				},
				{
					title: "Billing",
					url: "#",
				},
				{
					title: "Limits",
					url: "#",
				},
			],
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: MapPin,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
