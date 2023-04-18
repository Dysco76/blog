export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const formatter = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });

    const formatted = formatter.format(date).replace(/\//g, '.');

    return formatted;
};
