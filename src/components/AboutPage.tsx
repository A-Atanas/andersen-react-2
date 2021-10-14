import React from "react"; // React must be in scope when using JSX. Yes, TS, I know that it's not used explicitly

export default function AboutPage(): JSX.Element {
	return (
		<h2 style={{ margin: "1em" }}>
			Hello to whoever&apos;s looking through this test task. This was written as part of
			Andersen Lab JS Trainee program. I&apos;m a 19-year-old Software Engineer student from
			Ukraine. I have one thing to say. Never neglect deadlines. Don&apos;t repeat my mistake.
			The consequences hit hard.
		</h2>
	);
}
