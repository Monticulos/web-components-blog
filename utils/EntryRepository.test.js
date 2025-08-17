import { EntryRepository } from "./EntryRepository.js";

/**
 * Mainly for testing during development
 */

const TEST_PASS = "PASS:";
const TEST_FAIL = "FAIL:";

function assertEqual(expected, actual, testName) {
    testName && console.log(testName);
    const ASSERT_EQUAL_MESSAGE = `Expected '${expected}' to equal actual '${actual}'.\n`
    if (expected === actual) {
        console.log(TEST_PASS, ASSERT_EQUAL_MESSAGE);
    } else {
        console.log(TEST_FAIL, ASSERT_EQUAL_MESSAGE);
    }
}

function assertGreaterThan(numberToCompare, actualNumber, testName) {
    testName && console.log(testName);
    const ASSERT_GREATER_THAN_MESSAGE = `Expected actual ${actualNumber} to be greater than ${numberToCompare}.\n`
    if (actualNumber > numberToCompare) {
        console.log(TEST_PASS, ASSERT_GREATER_THAN_MESSAGE);
    } else {
        console.log(TEST_FAIL, ASSERT_GREATER_THAN_MESSAGE);

    }
}

(async function getEntries_getsAllEntries() {
    const entries = await EntryRepository.getEntries();
    assertGreaterThan(1, entries.length, "getEntries");
})();

(async function getEntry_getsEntry_fromGivenSlug() {
    const expectedSlug = "velkommen-til-bloggen";
    const entry = await EntryRepository.getEntry(expectedSlug);
    assertEqual(expectedSlug, entry.slugs[0], "getEntry")
})();

(async function getLatestEntry_getsLatestEntry() {
    const entry = await EntryRepository.getLatestEntry();
    assertEqual("2025-08-16.js", entry.sourceFile, "getLatestEntry");
})();

(async function getLatestEntrySlug_getsLatestEntrySlug() {
    const expectedSlug = "de-tre-klassiske-overbevisningsformene";
    const actualSlug = await EntryRepository.getLatestEntrySlug();
    assertEqual(expectedSlug, actualSlug, "getLatestEntrySlug");
})();

(async function getPreviousEntrySlug_getsPreviousEntrySlug() {
    const expectedSlug = "velkommen-til-bloggen";
    const currentEntrySlug = "de-tre-klassiske-overbevisningsformene"
    const actualSlug = await EntryRepository.getPreviousEntrySlug(currentEntrySlug);
    assertEqual(expectedSlug, actualSlug, "getPreviousEntrySlug");
})();

(async function getNextEntrySlug_getsNextSlug() {
    const expectedSlug = "de-tre-klassiske-overbevisningsformene";
    const currentEntrySlug = "velkommen-til-bloggen"
    const actualSlug = await EntryRepository.getNextEntrySlug(currentEntrySlug);
    assertEqual(expectedSlug, actualSlug, "getNextEntrySlug");
})();