import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import * as R from "ramda";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Share from "react-native-share";
import addItemToListIfPresentRemoveOtherwise from "../common/collections";
import {
	STORE_CONSUMED_FOOD_FOR_DAY_START,
	STORE_CONSUMED_FOOD_FOR_DAY_FINISHED,
	FETCH_CONSUMED_FOOD_FOR_DAY_START,
	FETCH_CONSUMED_FOOD_FOR_DAY_FINISHED
} from "./types";
import I18n from "../translations/i18n";

export const dayFormatForStoringConsumedFoodIds = "DD-MM-YYYY";

function formatDayForStorage(day) {
	return day.format(dayFormatForStoringConsumedFoodIds);
}

function getStorageKeyForDay(day) {
	const formattedDay = formatDayForStorage(day);
	return `consumed_food_ids:${formattedDay}`;
}

async function getConsumedFoodIdsForDay(day) {
	const ids = await AsyncStorage.getItem(getStorageKeyForDay(day));
	return ids === null ? [] : JSON.parse(ids);
}

async function addOrRemoveConsumedFoodIdForDay(day, id) {
	const ids = await getConsumedFoodIdsForDay(day);
	const updatedIds = addItemToListIfPresentRemoveOtherwise(id, ids || []);

	await AsyncStorage.setItem(
		getStorageKeyForDay(day),
		JSON.stringify(updatedIds)
	);
	return ids;
}

function dayBySubtractingDays(date, days) {
	const updatedDate = moment(date);
	updatedDate.subtract(days, "day");
	return updatedDate;
}

export function shareMonthlyReport(day, foodNamesById) {
	return async () => {
		const monthFormat = "MMM YYYY";
		let contentsInHtml =
			"<style>table{width:100%}td{color: #444;line-height: 22px;text-align: center;height: 40px;}tr:first-child td{font-size: 14px;font-weight: 200;}.dayNumber{font-size: 16px;font-weight: 800;}.foodName{font-size: 12px;font-weight: 400;}.foodName p{margin: 0;}</style><h1>Four Days</h1><h2>%TITLE% - %DATE%</h2><table><tr><td>%FIRST_DAY%</td><td>%SECOND_DAY%</td><td>%THIRD_DAY%</td><td>%FOURTH_DAY%</td><td>%FIFTH_DAY%</td><td>%SIXTH_DAY%</td><td>%SEVENTH_DAY%</td></tr>%CONTENT%</table>";

		const firstDayOfMonth = moment(day).startOf("month");
		const lastDayOfMonth = moment(day).endOf("month");

		const consumedFoodIdsForDays = {};
		let queryDay = moment(firstDayOfMonth);
		while (queryDay.isSameOrBefore(lastDayOfMonth)) {
			consumedFoodIdsForDays[queryDay] = await getConsumedFoodIdsForDay(
				queryDay
			);
			queryDay.add("1", "days");
		}

		const numberOfDaysPastMonday = (firstDayOfMonth.day() - 1) % 7;
		const numberOfDaysToFillFirstWeek = 7 - numberOfDaysPastMonday;

		const firstWeekEmptyDays = R.map(
			() => "<td/>",
			R.range(0, numberOfDaysPastMonday)
		);

		const firstWeekFillingDays = R.map(
			i => `<td class="dayNumber">${i}</td>`,
			R.range(1, numberOfDaysToFillFirstWeek + 1)
		);
		const firstWeekFillingForbiddenFoodIds = R.pipe(
			R.map(i => moment(firstDayOfMonth).add(i - 1, "days")),
			R.map(day => consumedFoodIdsForDays[day]),
			R.map(ids => R.map(id => foodNamesById[id], ids)),
			R.map(names => R.join("</p><p>", names || [])),
			R.map(content => `<td class="foodName"><p>${content}</p></td>`)
		)(R.range(1, numberOfDaysToFillFirstWeek + 1));

		const firstWeek = R.join("", [
			...firstWeekEmptyDays,
			...firstWeekFillingDays
		]);
		const firstWeekFoodIds = R.join("", [
			...firstWeekEmptyDays,
			...firstWeekFillingForbiddenFoodIds
		]);

		const weeksOtherThanFirst = R.pipe(
			R.map(i => `<td class="dayNumber">${i}</td>`),
			R.splitEvery(7),
			R.map(s => R.join("", s))
		)(R.range(numberOfDaysToFillFirstWeek + 1, lastDayOfMonth.date() + 1));

		const weeksOtherThanFirstFoodIds = R.pipe(
			R.map(i => moment(firstDayOfMonth).add(i - 1, "days")),

			R.map(day => consumedFoodIdsForDays[day]),
			R.map(ids => R.map(id => foodNamesById[id], ids)),
			R.map(names => R.join("</p><p>", names || [])),
			R.map(content => `<td class="foodName"><p>${content}</p></td>`),
			R.splitEvery(7),
			R.map(s => R.join("", s))
		)(R.range(numberOfDaysToFillFirstWeek + 1, lastDayOfMonth.date() + 1));

		const content =
			"<tr>" +
			R.join("</tr><tr>", [
				firstWeek,
				firstWeekFoodIds,
				...R.flatten(R.zip(weeksOtherThanFirst, weeksOtherThanFirstFoodIds))
			]) +
			"</tr>";

		contentsInHtml = contentsInHtml
			.replace("%TITLE%", I18n.t("report.title"))
			.replace("%DATE%", day.format(monthFormat))
			.replace("%FIRST_DAY%", I18n.t("report.monday"))
			.replace("%SECOND_DAY%", I18n.t("report.tuesday"))
			.replace("%THIRD_DAY%", I18n.t("report.wednesday"))
			.replace("%FOURTH_DAY%", I18n.t("report.thursday"))
			.replace("%FIFTH_DAY%", I18n.t("report.friday"))
			.replace("%SIXTH_DAY%", I18n.t("report.saturday"))
			.replace("%SEVENTH_DAY%", I18n.t("report.sunday"))
			.replace("%CONTENT%", content);

		let options = {
			html: contentsInHtml,
			fileName: "Reporte"
		};

		let file = await RNHTMLtoPDF.convert(options);

		await Share.open({
			title: I18n.t("report.sharingTitle"),
			message: I18n.t("report.sharingMessage").replace(
				"%s",
				day.format(monthFormat)
			),
			url: `file://${file.filePath}`,
			subject: "Report"
		});
	};
}

export function fetchForbiddenFoodForDay(day) {
	return async dispatch => {
		const selectedDay = day;
		const dayMinusOne = dayBySubtractingDays(selectedDay, 1);
		const dayMinusTwo = dayBySubtractingDays(selectedDay, 2);
		const dayMinusThree = dayBySubtractingDays(selectedDay, 3);

		dispatch({
			type: FETCH_CONSUMED_FOOD_FOR_DAY_START,
			payload: { days: [selectedDay, dayMinusOne, dayMinusTwo, dayMinusThree] }
		});

		const idsOnDay = await getConsumedFoodIdsForDay(selectedDay);
		const idsOnDayMinusOne = await getConsumedFoodIdsForDay(dayMinusOne);
		const idsOnDayMinusTwo = await getConsumedFoodIdsForDay(dayMinusTwo);
		const idsOnDayMinusThree = await getConsumedFoodIdsForDay(dayMinusThree);

		dispatch({
			type: FETCH_CONSUMED_FOOD_FOR_DAY_FINISHED,
			payload: {
				byDay: [
					{ day: selectedDay, ids: idsOnDay },
					{ day: dayMinusOne, ids: idsOnDayMinusOne },
					{ day: dayMinusTwo, ids: idsOnDayMinusTwo },
					{ day: dayMinusThree, ids: idsOnDayMinusThree }
				]
			}
		});
	};
}

export function storeConsumedFoodForDay(id, day) {
	return async dispatch => {
		dispatch({
			type: STORE_CONSUMED_FOOD_FOR_DAY_START,
			payload: { id, day }
		});

		await addOrRemoveConsumedFoodIdForDay(day, id);
		dispatch({
			type: STORE_CONSUMED_FOOD_FOR_DAY_FINISHED
		});
	};
}
