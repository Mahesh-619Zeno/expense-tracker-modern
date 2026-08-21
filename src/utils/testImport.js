import fs from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";
import { readFile, writeFile } from "fs/promises";
import { EventEmitter } from "events";
import { URL } from "url";
import http from "http";

export function getFileInfo(filePath) {
    return {
        name: path.basename(filePath),
        extension: path.extname(filePath),
        directory: path.dirname(filePath)
    };
}

export function createRequestId() {
    return crypto.randomUUID();
}

export function getTempDirectory() {
    return os.tmpdir();
}

export function buildFileUrl(filePath) {
    return new URL(`file://${path.resolve(filePath)}`);
}

export async function saveContent(filePath, content) {
    await writeFile(filePath, content, "utf-8");
}

export function createEventEmitter() {
    return new EventEmitter();
}