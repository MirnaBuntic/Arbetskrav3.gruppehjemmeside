export default {
    name: 'workLog',
    title: 'Work log',
    type: 'array',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'text',
        },
        {
            name: 'date',
            title: 'Date',
            type: 'datetime',
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'member' }],
        },
    ],
};