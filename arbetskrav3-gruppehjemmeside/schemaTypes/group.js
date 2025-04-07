export default {
    name: 'group',
    title: 'Group',
    type: 'document',
    fields: [
        {
            name: 'groupName',
            title: 'Group Name or Number',
            type: 'string',
        },
        {
            name:'members',
            title: 'Members',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'member' }] }],
        },
        {
            name: 'groupLog',
            title: 'Group Log',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'workLog' }] }],
        },
    ],
};