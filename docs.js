﻿var docs = require("./views/learn/docs.js"),
    fs = require("fs"),
    path = require("path"),
    marked = require("marked");

marked.setOptions({
    highlight: function(code, lang, callback) {
        require('pygmentize-bundled')({ lang: lang, format: 'html', options: { nowrap: true } }, code, function(err, result) {
            callback(err, result.toString());
        });
    }
});

exports.extensions = function(req, res) {
    res.render('learn/extensions', { learn: true });
};

exports.vsNet = function(req, res) {
    res.render('learn/vs-net', { learn: true });
};

exports.recipes = function(req, res) {
    res.render('learn/recipes', { learn: true });
};

exports.engines = function(req, res) {
    res.render('learn/engines', { learn: true });
};

exports.learn = function(req, res) {
    res.render('learn/learn', { learn: true, title: "Learn jsreport" });
};

exports.doc = function(req, res) {
    var filePath = path.join(__dirname, "views", "learn", "docs", req.params.doc + ".md");

    if (!fs.existsSync(filePath)) {
        return res.status(404).render("404");
    }

    fs.readFile(filePath, 'UTF-8', function(err, content) {
        if (content.charAt(0) === '\uFEFF')
            content = content.substr(1);

        marked(content, function(err, renderedContent) {
            res.render('learn/doc', {
                title: docs[req.params.doc],
                content: renderedContent,
                url: "http://jsreport.net" + req.url,
                id: req.params.doc,
                learn: true,
                linkDocCss: true
            });
        });
    });
};