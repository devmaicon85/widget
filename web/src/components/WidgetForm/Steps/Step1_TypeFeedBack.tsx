import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FeedBackType, feedbackTypes } from "../../../types/FeedBackTypes";
import {
    getQueryInstagram,
    getQueryTitle,
    getTheme,
} from "../../../util/getQueryUrl";
import { Button } from "../../Button";
import { Header } from "../Header";

type Props = {
    onFeedbackTypeChanged: (key: FeedBackType) => void;
};
export function Step1_TypeFeedBack({ onFeedbackTypeChanged }: Props) {
    return (
        <>
            <Header>{getQueryTitle()}</Header>

            <div className="p-4 flex py-8 w-full gap-1">
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
