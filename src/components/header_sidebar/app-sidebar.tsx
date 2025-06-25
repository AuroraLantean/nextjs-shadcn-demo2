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

import { SubSidebarMain } from "@header_sidebar/subsidebar-main";
import { SubSidebarProjects } from "@header_sidebar/subsidebar-projects";
import { SubsidebarUser } from "@header_sidebar/subsidebar-user";
import { TeamSwitcher } from "@header_sidebar/team-switcher";
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
	subsidebar: [
		{
			title: "Sui",
			url: "#",
			icon: BookOpen,
			isActive: true,
			items: [
				{
					title: "Sui Proposal",
					url: "/sui-proposal",
				},
				{
					title: "Sui Fungible",
					url: "/sui-fungible",
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
			title: "Postgres",
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
			<SidebarHeader className="bg-sky-400 dark:bg-secondary">
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent className="bg-sky-300 dark:bg-secondary">
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
				<SubSidebarMain items={data.subsidebar} />
				<SubSidebarProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter className="bg-sky-400 dark:bg-secondary">
				<SubsidebarUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
