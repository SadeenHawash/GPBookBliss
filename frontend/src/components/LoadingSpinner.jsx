const LoadingSpinner = ({ size = "md" }) => {
	const sizeClass = `loading-${size}`;

	return <span className={`loading loading-spinner text-primary ${sizeClass}`} />;
};
export default LoadingSpinner;