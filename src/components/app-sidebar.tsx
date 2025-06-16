"use client";

import type * as React from "react";
import {
	AudioWaveform,
	BookOpen,
	Wallet,
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
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@ui/sidebar";

const quickPages = [
	{
		title: "Wallet",
		url: "/wallet",
		icon: Wallet,
	},
];
const data = {
	user: {
		name: "John",
		email: "john.doe@x.com",
		avatar: "/avatars/profile.svg",
	},
	teams: [
		{
			name: "Google Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Amazon Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Bitcoin Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Sui Proposals",
			url: "#",
			icon: BookOpen,
			isActive: true,
			items: [
				{
					title: "List All",
					url: "/sui",
				},
				{
					title: "Add New",
					url: "/sui/new",
				},
				{
					title: "Vote",
					url: "/sui/vote",
				},
				{
					title: "List Prop1",
					url: "/sui/1",
				},
			],
		},
		{
			title: "Bitcoin Runes",
			url: "#",
			icon: SquareTerminal,
			items: [
				{
					title: "Dashboard",
					url: "/runes",
				},
				{
					title: "Activity",
					url: "/runes/activity",
				},
				{
					title: "Balances",
					url: "/runes/balances",
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
					url: "/nextjs/snippets",
				},
				{
					title: "new snippet",
					url: "/nextjs/snippets/new",
				},
				{
					title: "Snippet1",
					url: "/nextjs/snippets/1",
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
				<SidebarGroup>
					<SidebarGroupLabel>Quick Pages</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{quickPages.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
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
