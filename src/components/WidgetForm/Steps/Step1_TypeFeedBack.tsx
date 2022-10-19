import { FeedBackType, feedbackTypes } from "../../../types/FeedBackTypes";
import { useGetQueryTitle } from "../../../util/getQueryUrl";
import { Button } from "../../Button";
import { ButtonArrowLeft } from "../ButtonArrowLeft";
import { useRouter } from "next/router";

type Props = {
    onFeedbackTypeChanged: (key: FeedBackType) => void;
    onFeedbackRestartType: () => void;
};
export function Step1_TypeFeedBack({
    onFeedbackTypeChanged,
    onFeedbackRestartType,
}: Props) {
    const titleHeader = useGetQueryTitle();

    const router = useRouter();

    return (
        <>
            {router.query.apiFaq && (
                <ButtonArrowLeft onClick={onFeedbackRestartType} />
            )}
            
            {/* <Header onFeedbackRestart={onFeedbackRestartType}>
                {titleHeader}
            </Header> */}

            <div className="flex w-full gap-1 p-4 py-8">
                {Object.entries(feedbackTypes).map(([key, item]) => (
                    <Button
                        key={key}
                        onClick={() =>
                            onFeedbackTypeChanged(key as FeedBackType)
                        }
                        className={`
                            py-5 
                            gap-5
                            flex-col 
                            items-center 
                            bg-light-surface-secondary
                            dark:bg-dark-surface-secondary
                            text-light-text-primary
                            dark:hover:bg-dark-surface-secondary-hover
                            hover:bg-opacity-10
                        `}
                    >
                        <img src={item.image.src} alt={item.image.alt} />
                        <span>{item.title}</span>
                    </Button>
                ))}
            </div>
        </>
    );
}
