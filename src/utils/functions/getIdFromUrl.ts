export const getIdFromUrl = (url: string) => {
	const newUrl = new URL(url);

	return newUrl.pathname.replace('/media/', '').split('/', 1).toString();
};
