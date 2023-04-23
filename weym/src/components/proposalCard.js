import React from 'react';
import { useDatabase } from "../context/state";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faArrowRight, faUser, faCheck, faX } from '@fortawesome/free-solid-svg-icons';

function ProposalCard(props) {
    function getWeekdayLabel(dayOfWeek) {
        switch (dayOfWeek) {
            case 1:
                return "Sunday";
            case 2:
                return "Monday";
            case 3:
                return "Tuesday";
            case 4:
                return "Wednesday";
            case 5:
                return "Thursday";
            case 6:
                return "Friday";
            case 7:
                return "Saturday";
        }
    }

    const context = useDatabase();
    const user = context.proposal.sendersProposalInfo[props.i];
    const proposal = context.proposal.proposals[props.i];
    const startTimeHour = Math.floor(proposal["startTime"] / 60);
    const startTimeHourLabel = startTimeHour > 12 ? startTimeHour - 12 : startTimeHour / 60;
    const startTimeLabel = startTimeHourLabel + ':' + proposal["startTime"] % 60;

    // post request - on click for confirm or reject (green check or red x)

    return (
        <div className="proposalCard">
            <div className="proposalCardRow">
                <p><FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '5px' }} />{proposal["startLocation"]} <FontAwesomeIcon icon={faArrowRight} size="xs" /> {proposal["destination"]}</p>
                <p className="tripCardTime">{getWeekdayLabel(proposal["day"])} {startTimeLabel}</p>
            </div>
            <div className="proposalCardRow">
                <p className="tripCardName">from <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faUser} size="xs" />{user["firstName"]}</p>
                <div>
                    <button className="proposalCardButton accept"><FontAwesomeIcon icon={faCheck} /></button>
                    <button className="proposalCardButton reject"><FontAwesomeIcon icon={faX} /></button>
                </div>
            </div>
        </div>
    )
}

export default ProposalCard;