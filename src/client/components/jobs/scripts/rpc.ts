rpc.register('startWork', (location: string) => {
    mp.events.callRemote('playerStartWorkOnCollectors', location);
});