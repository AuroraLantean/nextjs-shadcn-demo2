"use client";

type ErrorPageProps = {
	error: Error;
	reset: () => void;
}; //Error object, and reset to refresh the route after clicking buttons

export default function ErrorPage({ error }: ErrorPageProps) {
	return <div>{error.message}</div>;
}
