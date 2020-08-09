const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const members = require('../../Members')

// Get Single Members
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({ msg : `No member with the id is ${req.params.id}`})
    }
})

// Get All member
router.get('/', (req, res) => {
    res.json(members)
})

// Create Members
router.post('/', (req, res) => {
    const newMember = {
        id : uuid.v4(),
        name : req.body.name,
        email : req.body.email,
        status : 'active' 
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({
            msg : 'Please include a name and email'
        })
    }
    members.push(newMember)
    res.redirect('/')
})

// Update a member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        const updatedMember = req.body
        members.forEach( member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updatedMember.name ? updatedMember.name : member.name
                member.email = updatedMember.email ? updatedMember.email : member.name
                
                res.json({ msg : 'member updated', member })
            }
        } )
    } else {
        res.status(400).json({ msg : `No member with the id is ${req.params.id}`})
    }
})

// Delete a member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json({
            msg : 'Members Deleted' , 
            member : members.filter(member => member.id !== parseInt(req.params.id))
        })
    } else {
        res.status(400).json({ msg : `No member with the id is ${req.params.id}`})
    }
})

module.exports = router 