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

(function getEntries_getsAllEntries() {
    const entries = EntryRepository.getEntries();
    assertGreaterThan(1, entries.length, "getEntries");
})();

(function getEntry_getsEntry_fromGivenSlug() {
    const expectedSlug = "velkommen-til-bloggen";
    const entry = EntryRepository.getEntry(expectedSlug);
    assertEqual(expectedSlug, entry.slugs[0], "getEntry")
})();

(function getLatestEntry_getsLatestEntry() {
    const entry = EntryRepository.getLatestEntry();
    assertEqual("2025-08-16.js", entry.sourceFile, "getLatestEntry");
})();

(function getLatestEntrySlug_getsLatestEntrySlug() {
    const expectedSlug = "de-tre-klassiske-overbevisningsformene";
    const actualSlug = EntryRepository.getLatestEntrySlug();
    assertEqual(expectedSlug, actualSlug, "getLatestEntrySlug");
})();

(function getPreviousEntrySlug_getsPreviousEntrySlug() {
    const expectedSlug = "velkommen-til-bloggen";
    const currentEntrySlug = "de-tre-klassiske-overbevisningsformene"
    const actualSlug = EntryRepository.getPreviousEntrySlug(currentEntrySlug);
    assertEqual(expectedSlug, actualSlug, "getPreviousEntrySlug");
})();

(function getNextEntrySlug_getsNextSlug() {
    const expectedSlug = "de-tre-klassiske-overbevisningsformene";
    const currentEntrySlug = "velkommen-til-bloggen"
    const actualSlug = EntryRepository.getNextEntrySlug(currentEntrySlug);
    assertEqual(expectedSlug, actualSlug, "getNextEntrySlug");
})();