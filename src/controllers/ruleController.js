const Rules = require('../models/Rules');

exports.getRules = async (req, res) => {
    try {
        const rules = await Rules.findAll();
        res.json(rules);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rules' + error });
    }
}

exports.updateRule = async (req, res) => {
    try {
        const ruleId = req.params.id;
        const rule = await Rules.findByPk(ruleId);
        rule.update(req.body);
        res.status(201).json({
            message: "rule update successfully",
            rule: req.body
        })
    } catch (error) {
        return res.status(500)
    }
}