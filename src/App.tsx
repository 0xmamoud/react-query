import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// type Post = {
// 	id: number;
// 	title: string;
// };

const POSTS = [
	{ id: 1, title: "Post1" },
	{ id: 2, title: "Post2" },
];

function App() {
	console.log(POSTS);

	const queryClient = useQueryClient();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["posts"],
		queryFn: () => wait(1000).then(() => [...POSTS]),
	});

	const newPostMutation = useMutation({
		mutationFn: async (title: string) => {
			return wait(1000).then(() =>
				POSTS.push({ id: POSTS.length + 1, title })
			);
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
	});

	if (isLoading) return <h1>Loading...</h1>;
	if (isError) return <h1>error</h1>;

	return (
		<>
			{data?.map((post) => (
				<p key={post.id}>{post.title}</p>
			))}
			<button
				disabled={newPostMutation.isPending}
				onClick={() => newPostMutation.mutate("mamoud")}
			>
				Add new post
			</button>
		</>
	);
}

export default App;

function wait(duration: number) {
	return new Promise((resolve) => setTimeout(resolve, duration));
}
