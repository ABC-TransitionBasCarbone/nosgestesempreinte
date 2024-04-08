import { twMerge } from 'tailwind-merge'

export default function SavesIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge('inline-block fill-default stroke-[1.5]', className)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.405 4.02773C15.3167 4.00653 15.2113 4.0001 14.6745 4.0001H7C6.44772 4.0001 6 3.55239 6 3.0001C6 2.44782 6.44772 2.0001 7 2.0001H14.6745C14.7025 2.0001 14.7303 2.00008 14.7578 2.00005C15.1647 1.99967 15.5235 1.99934 15.8719 2.08299C16.178 2.15648 16.4707 2.2777 16.7391 2.44218C17.0446 2.62942 17.298 2.88333 17.5855 3.17131C17.605 3.19081 17.6246 3.21046 17.6444 3.23025L20.7699 6.35574C20.7896 6.37553 20.8093 6.39515 20.8288 6.4146C21.1168 6.70206 21.3707 6.95549 21.5579 7.26103C21.7224 7.52945 21.8436 7.82208 21.9171 8.12819C22.0008 8.47664 22.0004 8.83539 22.0001 9.24229C22 9.26983 22 9.29759 22 9.32559V17.0001C22 17.5524 21.5523 18.0001 21 18.0001C20.4477 18.0001 20 17.5524 20 17.0001V9.32559C20 8.78881 19.9936 8.6834 19.9724 8.59509C19.9479 8.49305 19.9075 8.3955 19.8526 8.30603C19.8052 8.22859 19.7352 8.14951 19.3556 7.76995L16.2302 4.64447C15.8506 4.26491 15.7715 4.19492 15.6941 4.14746C15.6046 4.09263 15.5071 4.05223 15.405 4.02773ZM14.0811 7.50251C14.0336 7.50034 13.9683 7.5001 13.8373 7.5001H8V8.4001C8 8.69663 8.00078 8.85888 8.0103 8.97547C8.01068 8.98011 8.01107 8.9845 8.01145 8.98865C8.0156 8.98904 8.01999 8.98942 8.02464 8.9898C8.14122 8.99932 8.30347 9.0001 8.6 9.0001H12.5C13.0523 9.0001 13.5 9.44782 13.5 10.0001C13.5 10.5524 13.0523 11.0001 12.5 11.0001L8.56812 11.0001C8.31573 11.0001 8.06994 11.0002 7.86177 10.9832C7.63318 10.9645 7.36344 10.9204 7.09202 10.7821C6.7157 10.5904 6.40974 10.2844 6.21799 9.90808C6.07969 9.63666 6.03562 9.36693 6.01695 9.13833C5.99994 8.93017 5.99997 8.68438 6 8.432C6 8.42138 6 8.41075 6 8.4001V7.50017C5.5349 7.50062 5.21698 7.50367 4.96784 7.52403C4.69617 7.54623 4.59546 7.5839 4.54601 7.6091C4.35785 7.70497 4.20487 7.85795 4.109 8.04611C4.0838 8.09556 4.04612 8.19628 4.02393 8.46794C4.00078 8.75128 4 9.12355 4 9.7001V17.8001C4 18.3767 4.00078 18.7489 4.02393 19.0323C4.04612 19.3039 4.0838 19.4046 4.109 19.4541C4.20487 19.6423 4.35785 19.7952 4.54601 19.8911C4.59546 19.9163 4.69617 19.954 4.96784 19.9762C5.21698 19.9965 5.5349 19.9996 6 20L6 16.5682C5.99997 16.3158 5.99994 16.07 6.01695 15.8619C6.03562 15.6333 6.07969 15.3635 6.21799 15.0921C6.40974 14.7158 6.7157 14.4098 7.09202 14.2181C7.36344 14.0798 7.63318 14.0357 7.86177 14.017C8.06994 14 8.31573 14.0001 8.56812 14.0001H11.9319C12.1843 14.0001 12.4301 14 12.6382 14.017C12.8668 14.0357 13.1366 14.0798 13.408 14.2181C13.7843 14.4098 14.0903 14.7158 14.282 15.0921C14.4203 15.3635 14.4644 15.6333 14.4831 15.8619C14.5001 16.07 14.5 16.3158 14.5 16.5682L14.5 20C14.9651 19.9996 15.283 19.9965 15.5322 19.9762C15.8038 19.954 15.9045 19.9163 15.954 19.8911C16.1422 19.7952 16.2951 19.6423 16.391 19.4541C16.4162 19.4046 16.4539 19.3039 16.4761 19.0323C16.4992 18.7489 16.5 18.3767 16.5 17.8001V10.1628C16.5 10.0318 16.4998 9.96646 16.4976 9.91897C16.4975 9.91773 16.4975 9.91653 16.4974 9.91539C16.4967 9.91453 16.4958 9.91365 16.495 9.91273C16.463 9.87761 16.4169 9.83121 16.3243 9.73858L14.2615 7.67584C14.1689 7.58321 14.1225 7.53714 14.0874 7.5051C14.0865 7.50426 14.0856 7.50345 14.0847 7.50268C14.0836 7.50263 14.0824 7.50257 14.0811 7.50251ZM14.3386 22.0001C14.8657 22.0001 15.3205 22.0001 15.695 21.9695C16.0904 21.9372 16.4836 21.8659 16.862 21.6731C17.4265 21.3855 17.8854 20.9266 18.173 20.3621C18.3658 19.9837 18.4371 19.5905 18.4694 19.1951C18.5 18.8206 18.5 18.3658 18.5 17.8386V10.1628C18.5 10.1463 18.5 10.1292 18.5001 10.1118C18.5006 9.9219 18.5012 9.68276 18.4447 9.44743C18.3957 9.24335 18.3149 9.04826 18.2053 8.86932C18.0788 8.66296 17.9093 8.49432 17.7746 8.36039C17.7623 8.34809 17.7502 8.33608 17.7385 8.32437L15.6757 6.26162C15.664 6.24991 15.652 6.23784 15.6397 6.22547C15.5058 6.09083 15.3371 5.92128 15.1308 5.79482C14.9518 5.68516 14.7568 5.60436 14.5527 5.55536C14.3173 5.49886 14.0782 5.4995 13.8883 5.50001C13.8709 5.50006 13.8538 5.5001 13.8373 5.5001L6.16146 5.5001C5.63431 5.50008 5.17955 5.50007 4.80497 5.53067C4.40963 5.56297 4.01641 5.63429 3.63803 5.82708C3.07354 6.1147 2.6146 6.57364 2.32698 7.13813C2.13419 7.51651 2.06287 7.90973 2.03057 8.30507C1.99997 8.67965 1.99998 9.13441 2 9.66156V17.8386C1.99998 18.3658 1.99997 18.8206 2.03057 19.1951C2.06287 19.5905 2.13419 19.9837 2.32698 20.3621C2.6146 20.9266 3.07354 21.3855 3.63803 21.6731C4.01641 21.8659 4.40963 21.9372 4.80497 21.9695C5.17954 22.0001 5.6343 22.0001 6.16144 22.0001H14.3386ZM12.5 20.0001V16.6001C12.5 16.3036 12.4992 16.1413 12.4897 16.0247C12.4893 16.0201 12.4889 16.0157 12.4886 16.0116C12.4844 16.0112 12.48 16.0108 12.4754 16.0104C12.3588 16.0009 12.1965 16.0001 11.9 16.0001H8.6C8.30347 16.0001 8.14122 16.0009 8.02464 16.0104C8.01999 16.0108 8.0156 16.0112 8.01145 16.0116C8.01107 16.0157 8.01068 16.0201 8.0103 16.0247C8.00078 16.1413 8 16.3036 8 16.6001V20.0001H12.5Z"
      />
    </svg>
  )
}
