const UseGetDate = () => {
  const getDaysAgoText = (createdOn: string): string => {
    const createdDate = new Date(createdOn);
    const today = new Date();

    let years = today.getFullYear() - createdDate.getFullYear();
    let months = today.getMonth() - createdDate.getMonth();
    let days = today.getDate() - createdDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (years === 0 && months === 0 && days === 0) return "Today";
    if (years === 0 && months === 0 && days === 1) return "Yesterday";

    const parts = [];
    if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
    if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);

    return parts.join(", ") + " ago";
  };

  return { getDaysAgoText };
};

export default UseGetDate;
