/*
 * Copyright (c) 2014 IndigoUnited
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
'use strict';

var spawn = require('cross-spawn');

function buffered(method, command, args, options, callback) {
    var cp;
    var stdout;
    var stderr;
    var results;

    if (typeof options === 'function') {
        callback = options;
        options = null;
    }

    if (typeof args === 'function') {
        callback = args;
        args = options = null;
    }

    if (method === 'sync') {
        results = spawn.sync(command, args, options);
        callback(results.error, results.stdout ? results.stdout.toString() : null, results.status);
    } else {
        cp = spawn(command, args, options);
        stdout = stderr = null;

        cp.stdout && cp.stdout.on('data', function (buffer) {
            stdout = stdout || '';
            stdout += buffer.toString();
        });

        cp.stderr && cp.stderr.on('data', function (buffer) {
            stderr = stderr || '';
            stderr += buffer.toString();
        });

        cp.on('error', callback);

        cp.on('close', function (code) {
            code !== 0 && stderr && console.warn(stderr);
            callback(null, stdout, code);
        });
    }
}

module.exports = buffered;
