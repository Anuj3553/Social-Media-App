import { useInView } from 'react-intersection-observer';

interface InfiniteScrollContainerProps extends React.PropsWithChildren {
    onBottomReached: () => void;
    className?: string;
}

export default function InfiniteScrollContainer({
    children,
    onBottomReached,
    className,
}: InfiniteScrollContainerProps) {
    const { ref } = useInView({
        rootMargin: '200px',
        onChange(inview) {
            if (inview){
                onBottomReached();
            }
        }
    })

    return (
        <div className={className}>
            {children}
            <div ref={ref} />
        </div>
    )
}